//const herokuPrefix = ''
const herokuPrefix = 'https://cors-anywhere.herokuapp.com/'
const baseClientUrl = 'http://api.closetspacecomics.com/api'
//const baseClientUrl = 'http://localhost:53089/api'
//const baseClientUrl = 'http://closetspacecomics-api2.azurewebsites.net/api';


const clientUrl = herokuPrefix + baseClientUrl;

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
            id: issue.Id,
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
              publisher: filter.Name,
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
            id: title.Id,
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

  fillTitle: function(titleId){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/catalog/newissues/${titleId}`;
    return fetch(urlToFetch,{})
    .then(response => {return response});
  },

  getCollections: function(userId){
    let urlToFetch = `${clientUrl}/user/collection`;
    return fetch(urlToFetch,{
      headers: {
        'userId': userId
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {locations: []};
      if (jsonResponse.Locations){
        response.locations = jsonResponse.Locations.map(location => {
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

  getBoxList: function(userId, locationId, boxId){
    let urlToFetch = `${clientUrl}/user/collection/location/${locationId}/box/${boxId}`;
    return fetch(urlToFetch,{
      headers: {
        'userId': userId
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      let response = {items: []};
      if (jsonResponse){
        response.items = jsonResponse.map(item => {
          return {
            id: item.Id,
            imageUrl: item.ImageUrl
          }
        });
        return response;
      }
    });
  },

  getPurchases: function(userId, page){
    let urlToFetch = `${clientUrl}/user/purchases?page=${page}`;
    return fetch(urlToFetch,{
      headers: {
        'userId': userId
      }
    })
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

  addIssueToPurchase: function(userId, purchaseId, issueId){
//    let urlToFetch = `https://cors-anywhere.herokuapp.com/${clientUrl}/home/homepage`;
    let urlToFetch = `${clientUrl}/user/purchase/${purchaseId}/${issueId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      return {
          id: jsonResponse.Id,
          imageUrl: jsonResponse.ImageUrl
      };
    });
  },

  addPurchase: function(userId, purchaseId, description, purchaseDate, price){
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
        'userId': userId,
        'Content-Type': 'application/json',
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
