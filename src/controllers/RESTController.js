import RESTModel from '../models/RESTModel';
import {Controller} from 'ringa';

/**
 * RESTController
 */
export default class RESTController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, bus, options) {
    super(name, bus, Object.assign({
      timeout: 60000,
      killOnErrorHandler: () => false,
      timeoutHandler: () => {}
    }, options));

    this.restModel = new RESTModel();

    this.addModel(this.restModel);

    this.cache = {};

    //-----------------------------------
    // Utility
    //-----------------------------------
    let startRequest = (restModel) => {
      restModel.calls++;
      restModel.activeCalls++;
    };

    let finRequest = (restModel) => {
      restModel.activeCalls--;
    };

    let requireBodyParam = ($ringaEvent) => {
      let bodyParam = $ringaEvent.detail.bodyParam;
      if (bodyParam !== undefined) {``
        if (!$ringaEvent.detail[bodyParam]) {
          throw new Error(`Required parameter '${bodyParam}' was not provided on RingaEvent detail!`);
        }
        $ringaEvent.detail.body = $ringaEvent.detail[bodyParam];
      } else {
        $ringaEvent.detail.body = {};
      }
    };

    let requireIdParam = ($ringaEvent) => {
      let idParam = $ringaEvent.detail.idParam;
      if (!$ringaEvent.detail[idParam]) {
        throw new Error(`Required parameter '${idParam}' was not provided on RingaEvent detail!`);
      }
      $ringaEvent.detail.id = $ringaEvent.detail[idParam];
    };

    let maybeIdParam = ($ringaEvent) => {
      let idParam = $ringaEvent.detail.idParam;
      $ringaEvent.detail.id = $ringaEvent.detail[idParam];
    };

    let buildUrlParam = ($ringaEvent, url) => {
      let API_ROOT = $ringaEvent.detail.API_ROOT || this.options.API_ROOT;

      $ringaEvent.detail.finalUrl = `${API_ROOT || ''}${url}`;
    };

    //------------------------------------
    // GET, POST, PUT, DELETE
    //------------------------------------
    // RESTController.GET
    this.addListener('GET', [
      startRequest,
      maybeIdParam,
      buildUrlParam,
      ($ringaEvent, finalUrl) => this.request({
        url: finalUrl,
        type: 'GET',
        id: $ringaEvent.detail.id,
        cacheRequest: $ringaEvent.detail.cacheRequest,
        $ringaEvent}),
      finRequest
    ]);

    // RESTController.POST
    this.addListener('POST', [
      startRequest,
      requireBodyParam,
      buildUrlParam,
      ($ringaEvent, finalUrl, body) => this.request({url: finalUrl, type: 'POST', body, $ringaEvent}),
      finRequest
    ]);

    // RESTController.PUT
    this.addListener('PUT', [
      startRequest,
      requireBodyParam,
      maybeIdParam,
      buildUrlParam,
      ($ringaEvent, finalUrl, body, id) => this.request({url: finalUrl, type: 'PUT', body, id, $ringaEvent}),
      finRequest
    ]);

    // RESTController.DELETE
    this.addListener('DELETE', [
      startRequest,
      maybeIdParam,
      buildUrlParam,
      ($ringaEvent, finalUrl, id) => this.request({url: finalUrl, type: 'DELETE', id, $ringaEvent}),
      finRequest
    ]);

    this.addListener('getApiRoot', $ringaEvent => {
      $ringaEvent.detail.restRoot = $ringaEvent.detail.API_ROOT || this.options.API_ROOT || ''
    });
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  processAnyErrors(request, response) {
    // status === 0: BROWSER CONNECTION ERROR
    // status >= 500: server error
    // status >= 400: request error
    if (response.status === 0) {
      this.restModel.noInternet = true;

      this.restModel.errors = this.restModel.errors.concat([{
        request,
        response
      }]);
    }
    else if (response.status === 401) {
      // This is handled by BPAuthController
    } else if (response.status >= 400) {
      if (response.response.search('forbidden') !== -1) {
        this.dispatch(GlobalErrorController.GLOBAL_ERROR, {
          message: 'forbidden'
        });
      }

      this.restModel.errors = this.restModel.errors.concat([{
        request,
        response
      }]);
    }
  }

  request(props) {
    return new Promise((resolve, reject) => {

      this.restModel.noInternet = false;

      let headers = props.$ringaEvent.detail.headers;

      let xhr = new XMLHttpRequest();
      let url = props.url;

      if (props.body && props.body.serialize) {
        props.body = props.body.serialize({
          useRingaDefaults: false
        });
      }

      if (props.id) {
        url = `${url}/${props.id}`;
      }

      let cacheItem;

      let request = {
        url,
        body: props.body ? JSON.stringify(props.body) : undefined
      };

      if (props.cacheRequest && props.type === 'GET' && (cacheItem = this.restModel.getCacheFor(url))) {
        if (cacheItem.response) {
          resolve(cacheItem.response);
        } else {
          cacheItem.watchers.push((cacheItem) => {
            resolve(cacheItem.response);
          });
        }
      } else {
        xhr.open(props.type, url, true);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        if (headers) {
          for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }

        let handleError = () => {
          let response = {
            status: xhr.status,
            response: xhr.response
          };

          if (!props.$ringaEvent.detail.restErrorHandler || props.$ringaEvent.detail.restErrorHandler(response)) {
            this.processAnyErrors(request, response);

            reject({
              request,
              response: response.response,
              status: response.status
            });
          } else {
            handleResult();
          }
        };

        let handleResult = () => {
          let parsedResponse;

          try {
            parsedResponse = xhr.response ? JSON.parse(xhr.response) : undefined;
          } catch (error) {
            console.error('Could not parse response as JSON:', xhr.response);
          }

          if (props.cacheRequest) {
            this.restModel.finishCacheRequest(url, parsedResponse);
          }

          resolve(parsedResponse);
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            handleResult();
          } else {
            handleError();
          }
        };

        xhr.onerror = () => {
          handleError();
        };

        if (props.cacheRequest) {
          this.restModel.startCacheRequest(url, props.cacheRequest.timeout);
        }

        xhr.send(request.body);
      }
    });
  }
}
