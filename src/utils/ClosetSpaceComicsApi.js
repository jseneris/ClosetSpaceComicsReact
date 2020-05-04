//const herokuPrefix = ''
//const baseClientUrl = 'http://localhost:53089/api'
const herokuPrefix = 'https://cors-anywhere.herokuapp.com/'
const baseClientUrl = 'http://api.closetspacecomics.com/api'
//const baseClientUrl = 'http://closetspacecomics-api2.azurewebsites.net/api';


const clientUrl = herokuPrefix + baseClientUrl;

let ClosetSpaceComicsApi = {
  searchByDate: function(date){
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
            imageUrl: location.ImageUrl,
            boxes: location.Boxes.map(box => {
              return {
                id: box.Id,
                name: box.Name,
                imageUrl: box.ImageUrl
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
        response.totalPages = jsonResponse.TotalPages;
        response.Purchases = jsonResponse.Purchases.map(purchase => {
          return {
            id: purchase.Id,
            description: purchase.Description,
            purchaseDate: purchase.PurchaseDate,
            price: purchase.Price,
            size: purchase.Size,
            imageUrl: purchase.ImageUrl,
            issues: purchase.Issues.map(issue => {
              return {
                id: issue.Id,
                imageUrl: issue.ImageUrl,
                title: issue.Title,
                issueNum: issue.IssueNum,
                condition: issue.Condition,
                locationId: issue.LocationId,
                locationName: issue.LocationName,
                boxId: issue.BoxId,
                boxName: issue.BoxName
              }
            })
          }
        });
        return response;
      }
    });
  },

  addIssueToPurchase: function(userId, purchaseId, issueId){
    let urlToFetch = `${clientUrl}/user/purchase/${purchaseId}/${issueId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId
      }
    })
    .then(response => response.json())
    .then(issue => {
      return {
          id: issue.Id,
          imageUrl: issue.ImageUrl,
          title: issue.Title,
          issueNum: issue.IssueNum,
          condition: issue.Condition,
          locationId: issue.LocationId,
          locationName: issue.LocationName,
          boxId: issue.BoxId,
          boxName: issue.BoxName
      };
    });
  },

  addPurchase: function(userId, description, purchaseDate, price){
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
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
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

  editPurchase: function(userId, purchaseId, description, purchaseDate, price){
    var data = {
      Description: description,
      PurchaseDate: purchaseDate,
      Price: price
    };
    let urlToFetch = `${clientUrl}/user/purchases/${purchaseId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
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

  addLocation: function(userId, description){
    var data = {
      Name: description
    };
    let urlToFetch = `${clientUrl}/user/locations`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
        return {
          id: jsonResponse.Id,
          name: jsonResponse.Name,
          imageUrl: jsonResponse.ImageUrl,
          boxes: jsonResponse.Boxes.map(box => {
            return {
              id: box.Id,
              name: box.Name,
              imageUrl: box.ImageUrl
            }
          })
        }
      });
    },

  editLocation: function(userId, locationId, description){
    var data = {
      Name: description
    };
    let urlToFetch = `${clientUrl}/user/locations/${locationId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
        return {
          id: jsonResponse.Id,
          name: jsonResponse.Name,
          imageUrl: jsonResponse.ImageUrl,
        }
    });
  },

  moveBook: function(userId, bookId, newPosition){
    let urlToFetch = `${clientUrl}/user/moveBook/${bookId}/${newPosition}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
    });
  },

  addBox: function(userId, locationId, name){
    var data = {
      Name: name
    };
    let urlToFetch = `${clientUrl}/user/locations/${locationId}/boxes`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
        return {
          id: jsonResponse.Id,
          name: jsonResponse.Name,
          imageUrl: jsonResponse.ImageUrl,
        }
    });
  },

  editBox: function(userId, locationId, boxId, name){
    var data = {
      Name: name
    };
    let urlToFetch = `${clientUrl}/user/locations/${locationId}/boxes/${boxId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
        return {
          id: jsonResponse.Id,
          name: jsonResponse.Name,
          imageUrl: jsonResponse.ImageUrl,
        }
    });
  },

  editBook: function(userId, locationId, boxId, bookId, newBoxId){
    var data = {
      BookId: bookId,
      BoxId: newBoxId
    };
    let urlToFetch = `${clientUrl}/user/locations/${locationId}/boxes/${boxId}/books/${bookId}`;
    return fetch(urlToFetch,{
      method: 'post',
      headers: {
        'userId': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonResponse => {
        return {
          id: jsonResponse.Id,
          imageUrl: jsonResponse.ImageUrl,
          title: jsonResponse.Title,
          issueNum: jsonResponse.IssueNum,
          condition: jsonResponse.Condition,
          locationId: jsonResponse.LocationId,
          locationName: jsonResponse.LocationName,
          boxId: jsonResponse.BoxId,
          boxName: jsonResponse.BoxName
        }
    });
  },

};

export default ClosetSpaceComicsApi;
