let params = {
    action: "query",
    titles: "",
    format: "json",
    prop: 'links|extracts',
    exsentences: '1',
    exlimit: '1',
    explaintext: '1',
    pllimit: 'max'
  };
export default params;
export let extractParams = {
  action: "query",
    titles: "",
    format: "json",
    prop: 'extracts',
    exsentences: '1',
    exlimit: '1',
    explaintext: '1',
}