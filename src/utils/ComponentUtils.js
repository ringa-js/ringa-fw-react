/**
 * This standardized function converts an item into a label. It assumes that props will have one or
 * more of the following:
 *
 * - labelField
 * - labelFunction
 *
 * And the `item` could be a String, number, or Object.
 *
 * @param item
 * @param props
 */
export function calcLabel(item, props, context) {
  if (typeof item !== 'object') {
    return item.toString();
  }

  const {labelField, labelFunction} = props;

  if (labelFunction) {
    return labelFunction(item, context);
  }

  return item[labelField || 'label'];
}