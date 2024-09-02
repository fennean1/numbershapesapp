
export async function getCollection(collection, id = "", acc = []) {
  return new Promise((resolve) => {
    const modID = `/${id}`
    const reqToOpen = `https://api.jsonbin.io/v3/c/${collection}/bins${modID}`

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let arr = JSON.parse(req.responseText)
        const lastIndex = arr.length - 1
        acc.push(...arr)
        if (lastIndex < 9) {
          console.log("resolving", acc)
          resolve(acc)
        } else {
          return getCollection(collection, arr[lastIndex].record, acc)
        }
      }
    };

    req.open("GET", reqToOpen, true);
    req.setRequestHeader("X-Master-Key", "$2b$10$bvi9UILE60dg8W3WvhHrVOlXsFrqnl2nxmCEVqbJdbG2Vi2nnCmrm");
    req.send()
  })
}




