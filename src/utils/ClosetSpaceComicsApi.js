//const clientUrl = 'http://localhost:53089/api'
const clientUrl = 'http://closetspacecomics-api.azurewebsites.net/api'

let ClosetSpaceComicsApi = {
  searchByDate: function(date){
    console.log('search: ' + date);
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/home/issues?date=${date}`;
    return fetch(urlToFetch,{})
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {Issues: [], Filters: []};
      if (jsonResponse.Issues){
        response.Issues = jsonResponse.Issues.map(issue => {
          return {
            imageUrl: issue.ImageUrl,
            title: issue.Title,
            issueNum: issue.IssueNum,
            publisher: issue.Publisher
          }
        });
        if (jsonResponse.Filters){
          response.Filters = jsonResponse.Filters.map(filter => {
            return {
              publisher: filter.Publisher,
              imageUrl: filter.ImageUrl
            }
          });
        }
        return response;
      }
    });
  }
};

export default ClosetSpaceComicsApi;
