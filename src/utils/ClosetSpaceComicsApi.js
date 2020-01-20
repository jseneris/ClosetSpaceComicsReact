const clientUrl = 'http://localhost:53089/api'
//const clientUrl = 'http://closetspacecomics-api.azurewebsites.net/api';

let ClosetSpaceComicsApi = {
  searchByDate: function(date){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/catalog/issues?date=${date}`;
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
            publisher: issue.Publisher,
            description: issue.Description,
            coverPrice: issue.CoverPrice
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
  },

  searchByTitle: function(title){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/catalog/issues?title=${title}`;
    return fetch(urlToFetch,{})
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {Titles: []};
      if (jsonResponse.Titles){
        response.Titles = jsonResponse.Titles.map(title => {
          return {
            imageUrl: title.ImageUrl,
            title: title.Name,
            seoFriendlyName: title.SeoFriendlyName,
            issues: title.Issues.map(issue => {
              return {
                id: issue.Id,
                imageUrl: issue.ImageUrl,
                title: issue.Title,
                issueNum: issue.IssueNum,
                publisher: issue.Publisher,
                description: issue.Description,
                coverPrice: issue.CoverPrice
              }
            })
          }
        });
        return response;
      }
    });
  },

  getCollections: function(){
    let urlToFetch = `${clientUrl}/user/collection`;
    return fetch(urlToFetch,{})
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {Locations: []};
      if (jsonResponse.Locations){
        response.Locations = jsonResponse.Locations.map(location => {
          return {
            id: location.Id,
            name: location.Name,
            boxes: location.Boxes.map(box => {
              return {
                id: box.Id,
                name: box.Name
              }
            })
          }
        });
        return response;
      }
    });
  },

  getPurchases: function(page){
    let urlToFetch = `${clientUrl}/user/purchases`;
    return fetch(urlToFetch,{})
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {Purchases: []};
      if (jsonResponse){
        response.Purchases = jsonResponse.map(purchase => {
          return {
            id: purchase.Id,
            description: purchase.Description,
            purchaseDate: purchase.PurchaseDate,
            price: purchase.Price,
            size: purchase.Size,
            issues: purchase.Issues.map(issue => {
              return {
                id: issue.Id,
                imageUrl: issue.ImageUrl
              }
            })
          }
        });
        return response;
      }
    });
  },

  addIssueToPurchase: function(purchaseId, issueId){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/user/purchase/${purchaseId}/${issueId}`;
    return fetch(urlToFetch,{
      method: 'post'
    })
    .then(response => response.json())
    .then(jsonResponse => {
      return {
          id: jsonResponse.Id,
          imageUrl: jsonResponse.ImageUrl
      };
    });
  },

  addPurchase: function(purchaseId, description, purchaseDate, price){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    var data = {
      Description: description,
      PurchaseDate: purchaseDate,
      Price: price
    };
    let urlToFetch = `${clientUrl}/user/purchases`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
//      return jsonResponse;
        return {
          id: jsonResponse.Id,
          description: jsonResponse.Description,
          purchaseDate: jsonResponse.PurchaseDate,
          price: jsonResponse.Price,
          size: 0,
          issues: []
        }
    });
  },

};

export default ClosetSpaceComicsApi;
