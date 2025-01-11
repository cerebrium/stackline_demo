/**
 *
 * Takes an unformatted number and adds a decimal
 * place to it. It also adds commas, and a dollar
 * sign.
 *
 */
export function add_commas_and_sign(input: number) {
  if (input === 0) {
    return "$0.00";
  }

  const divided_num = (input / 100).toFixed(2).split(".");
  const prefix_without_commas = divided_num[0];

  let prefix_with_commas = "";
  for (let i = prefix_without_commas.length - 1; i > -1; i--) {
    if (i % 3 === 0 && i !== prefix_without_commas.length - 1) {
      prefix_with_commas = "," + prefix_with_commas;
    }
    prefix_with_commas = prefix_without_commas[i] + prefix_with_commas;
  }

  const suffix = divided_num[1];

  return `$${prefix_with_commas}.${suffix}`;
}
