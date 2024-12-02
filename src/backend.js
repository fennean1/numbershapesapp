
export async function getCollection(collection, id = "", acc = [],reso) {
  return new Promise((resolve) => {
    const modID = `/${id}`
    const reqToOpen = `https://api.jsonbin.io/v3/c/${collection}/bins${modID}`

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let arr = JSON.parse(req.responseText)
        const lastIndex = arr.length - 1
        acc.push(...arr)


        // Grab the most recent 50 records.
        if (arr.length < 10) {
          let p = resolve(acc)
          return p;
        } else {
          console.log("getting collection")
          let p = getCollection(collection, arr[lastIndex].record, acc,resolve)
          return p;
        }
      }
    };

    req.open("GET", reqToOpen, true);
    req.setRequestHeader("X-Master-Key", "$2b$10$bvi9UILE60dg8W3WvhHrVOlXsFrqnl2nxmCEVqbJdbG2Vi2nnCmrm");
    req.send()
  }).then(res => {
    reso && reso(acc)
    return res;
  })
}

let safety = 0;

export async function getBins(bins, acc = [],reso) {
  return new Promise((resolve)=> {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {

    safety++;
    if (req.readyState == XMLHttpRequest.DONE) {

      if (bins.length > 0) {
        let record = JSON.parse(req.responseText).record;
        acc.push(record);
        console.log("acc",acc)
        getBins(bins, acc,resolve)
      } else if (bins.length == 0 || safety == 20) {
        resolve(acc)
      }
    }
  }
    let id = bins.shift()
  
    let lookup = `https://api.jsonbin.io/v3/b/${id}/latest`;
    req.open("GET", lookup, true);
    req.setRequestHeader("X-Master-Key", "$2b$10$bvi9UILE60dg8W3WvhHrVOlXsFrqnl2nxmCEVqbJdbG2Vi2nnCmrm");
    req.send();
  }).then(res => {
    reso && reso(acc)
    return res;
  })
}




