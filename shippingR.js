let elemenT = document.createElement("section")
let widthEl = document.createElement("input")
let heighEl = document.createElement("input")
let lengthEl = document.createElement("input")
let qtyEl = document.createElement("input")
let weightEl = document.createElement("input")
let calButton = document.createElement("button")
let result = document.createElement("div")
result.id = "result"
result.hidden = true

let wmData;


calButton.id = "calButton"
calButton.innerText = "Calculate"
weightEl.id = "weightEl"
weightEl.placeholder = "Weight"
heighEl.placeholder = "H"
lengthEl.placeholder = "L"
widthEl.placeholder = "W"
qtyEl.id = "qtyEl"
qtyEl.placeholder = "Qty"
lengthEl.id = "lengthEl"
heighEl.id = "heighEl"
widthEl.id = "widthEl"
elemenT.id = "elemenT"


elemenT.innerHTML = `<div>Estimate Shipping Rate</div> 
<div id = "dimDiv">${widthEl.outerHTML} x ${heighEl.outerHTML} x ${lengthEl.outerHTML} </div> 
<div id = "wQTY"> ${weightEl.outerHTML} ${qtyEl.outerHTML} </div>
${result.outerHTML}
<div> ${calButton.outerHTML} </div>
    `
if(document.URL.includes("seller.walmart")){
    let tmx = JSON.parse(localStorage.TMX_DATA).LOGIN.tmxId
    let xsrf = JSON.parse(localStorage.TMX_DATA).LOGIN.sessionId
    let dataS = {tmx,xsrf}
    chrome.storage.local.set({"Details": dataS})
}



let price;
let dim;
let weightP;
if(document.readyState == "interactive" && document.URL.includes("/ip/")){
    if(JSON.parse(document.getElementById("__NEXT_DATA__").textContent) != null || document.getElementById("__NEXT_DATA__").textContent != undefined){
        wmData = document.getElementById("__NEXT_DATA__").textContent
         price = JSON.parse(document.getElementById("__NEXT_DATA__").textContent).props.pageProps.initialData.data.product.priceInfo.currentPrice.price
         JSON.parse(document.getElementById("__NEXT_DATA__").textContent).props.pageProps.initialData.data.idml.specifications.map((e)=>{
            if(e.name == "Assembled Product Dimensions (L x W x H)"){
                dim = e.value
            }
            if(e.name == "Assembled Product Weight"){
                weightP = e.value
            }
         })
        }

    let arr = []
    chrome.storage.local.get("Details").then(e=>{
        if(e.Details != undefined){
            arr.push(e.Details.tmx, e.Details.xsrf)
        }
    })
    ///
    document.getElementsByClassName("pt3 pb4")[0].insertAdjacentElement("beforebegin",elemenT)


    if(dim != null | dim != undefined){

        document.getElementById("widthEl").value = dim.slice(0,dim.indexOf("x")).trim()
        document.getElementById("lengthEl").value = dim.slice(dim.indexOf("x") + 1,dim.lastIndexOf("x")).trim()
        document.getElementById("heighEl").value = dim.slice(dim.lastIndexOf("x") + 1,dim.indexOf("Inches")).trim()
    }
    if(weightP != null | weightP != undefined){
        document.getElementById("weightEl").value = weightP.replace("lb","").trim()

    }
    if(document.getElementById("elemenT") != null || document.getElementById("elemenT") != undefined){
        
        document.getElementById("widthEl").addEventListener("change",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
    
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
    
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0
            a.children[3].innerText = `Dimensions: ${e.target.value || w} x ${h} x ${l * qt} \n Weight: ${we * qt} lbs \n Qty: ${qt}`
            a.children[3].hidden = false
        })

        document.getElementById("heighEl").addEventListener("change",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
    
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
    
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0

            if(a.children[3].hidden == false){
                a.children[3].innerText = `Dimensions: ${w} x ${e.target.value} x ${l * qt} \n Weight: ${we * qt} lbs \n Qty: ${qt}`
            }else{
                a.children[3].innerText = `Dimensions: ${w} x ${e.target.value} x ${l * qt} \n Weight: ${we * qt} lbs \n Qty: ${qt}`
                a.children[3].hidden = false
            }   
        })

        document.getElementById("lengthEl").addEventListener("change",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
    
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
    
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0
            if(a.children[3].hidden == false){
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${e.target.value * qt} \n Weight: ${we * qt} lbs \n Qty: ${qt}`
            }else{
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${e.target.value * qt} \n Weight: ${we * qt} lbs \n Qty: ${qt}`
                a.children[3].hidden = false
            } 
        })


        document.getElementById("weightEl").addEventListener("change",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
            
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
            
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0

            if(a.children[3].hidden == false){
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${l * qt} \n Weight: ${e.target.value * qt} lbs \n Qty: ${qt}`
            }else{
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${l * qt} \n Weight: ${e.target.value * qt} lbs \n Qty: ${qt}`
                a.children[3].hidden = false
            } 
        })

        document.getElementById("qtyEl").addEventListener("change",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
    
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
    
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0
            if(a.children[3].hidden == false){
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${l * e.target.value} \n Weight: ${we * qt} lbs \n Qty: ${e.target.value}`
            }else{
                a.children[3].innerText = `Dimensions: ${w} x ${h} x ${l * e.target.value} \n Weight: ${we * qt} lbs \n Qty: ${e.target.value}`
                a.children[3].hidden = false
            } 
        })

        document.getElementById("calButton").addEventListener("click",(e)=>{
            let a = document.getElementById("elemenT")
            let d = a.children[1].children
            let q = a.children[2].children
    
            let w = a.children[1].children[0].value || 0
            let h = a.children[1].children[1].value || 0
            let l = a.children[1].children[2].value || 0
    
            let we = a.children[2].children[0].value || 0
            let qt = a.children[2].children[1].value || 0
  
            if(~~w >= 0 && ~~h >= 0 && ~~l >= 0 && ~~we >= 0 && ~~qt >= 0){
                getThis(w,h,l,we,qt)
            }else{
                window.alert("Some fields are missing - Complete all fields")
            }

        })
    }

    let currentDay = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    let date = new Date()
    let shiprawDate = new Date(date.getTime() + 1 * 24 * 60 * 60 *1000)
    let shipDate = shiprawDate.toLocaleString("en-us",{weekday:"short",month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).replaceAll(",","").replace("PM","").replace("AM","") + "GMT " + date.getFullYear()
    let newDate = new Date(date.getTime() + 5 * 24 * 60 * 60 *1000)
    let deliverDate = newDate.toLocaleString("en-us",{weekday:"short",month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).replaceAll(",","").replace("PM","").replace("AM","") + "GMT " + date.getFullYear()
  
    async function getThis(b,c,d,e,f) {
        if(arr.length >= 2){
            let a = document.getElementById("result")
            let newElement = document.createElement("div")
            newElement.id = "newElement"
            let cost = document.createElement("div")    
            cost.id = `cost`
            cost.innerHTML = `Cost: <input id="costInput">`

            let data = await fetch("https://seller.walmart.com/aurora/v1/sww/label/graphql", {
                "headers": {
                  "accept": "application/json",
                  "accept-language": "en-US,en;q=0.9",
                  "content-type": "application/json",
                  "priority": "u=1, i",
                  "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "wm_aurora.locale": "en-US",
                  "wm_aurora.market": "US",
                  "wm_aurora.tmxevent": "LOGIN",
                  "wm_aurora.tmxid": `${arr[0]}`,
                  "wm_svc.name": "API",
                  "wm_sww.program_type": "DOMESTIC",
                  "x-xsrf-token": `${arr[1]}`
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `{\"query\":\"\\n  query get_swwLabel_shippingEstimatesv2 ($estimatesRequest: ShippingEstimatesRequest!, $nudgeDiscountRequest: NudgeDiscountsRequest) {\\n    get_swwLabel_shippingEstimatesv2(estimatesRequest: $estimatesRequest, nudgeDiscountRequest: $nudgeDiscountRequest) {\\n      \\n  estimates {\\n    name\\n    displayName\\n    deliveryDate\\n    estimatedRate {\\n      amount\\n      currency\\n    }\\n    discountedRates{\\n       discountRate {\\n            amount\\n            currency\\n        }\\n        promotionType\\n    }\\n    serviceTypeGroupName\\n    serviceTypeGroupDisplayName\\n    isDeliveryPromiseFulfilled\\n    isByoaEnabled\\n    carrierName\\n    carrierDisplayName\\n    addOns {\\n      name\\n      charge {\\n        amount\\n        currency\\n      }\\n      isApplicable\\n      declaredValue {\\n        amount\\n        currency\\n      }\\n    }\\n  }\\n\\n      isEligibleForPromo\\n      alertMessage\\n      warningMessage\\n      nudgeDiscountResponse {\\n        savings {\\n          amount\\n          currency\\n        }\\n        carrierServiceType\\n      }\\n      discounts {\\n        tier\\n        discountValue,\\n        discountType,\\n        promotionType\\n      }\\n    }\\n  }\\n\",\"variables\":{\"estimatesRequest\":{\"deliverByDate\":\"${deliverDate}\",\"shipByDate\":\"${shipDate}\",\"shippingMethod\":\"STANDARD\",\"fromAddress\":{\"postalCode\":\"16506\",\"countryCode\":\"US\",\"addressLines\":[\"3059 Bradford Ave\",\"\"],\"city\":\"Erie\",\"state\":\"PA\"},\"toAddress\":{\"postalCode\":\"90210\",\"countryCode\":\"US\",\"addressLines\":[\"225 N CRESCENT\",\"\"],\"city\":\"BEVERLY HILLS\",\"state\":\"CA\"},\"groupByCriteria\":\"NONE\",\"includeServicesNotMeetingDeliveryPromise\":true,\"boxItems\":[{\"lineId\":\"1\",\"sku\":\"\",\"quantity\":1}],\"packageType\":\"CUSTOM_PACKAGE\",\"boxDimensions\":{\"boxDimensionUnit\":\"IN\",\"boxWeightUnit\":\"LB\",\"boxLength\":${JSON.stringify(d*f)},\"boxWidth\":${JSON.stringify(b)},\"boxHeight\":${JSON.stringify(c)},\"boxWeight\":${JSON.stringify(e*f)}}}}}`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
              })

              let dataRaw = await data.text()
              let rateJson = JSON.parse(dataRaw).data.get_swwLabel_shippingEstimatesv2.estimates[0].estimatedRate.amount
              console.log(d,f,b,c)
              newElement.innerText = `\n Buybox: $${price} \n Commission (15%): $${(price * .15).toFixed(2)} \n Shipping Cost: $${rateJson} \n`
              a.append(newElement)
              a.append(cost)

              let profitEl = document.createElement("div")

              document.getElementById("costInput").addEventListener("change",(e)=>{
                profitEl.innerHTML = `Profit: $${(price - e.target.value - (price * .15) - rateJson).toFixed(2)}`
                a.append(profitEl)
              })

        }else{
            window.alert("You need to login")
        }



    }
}
let xx;
chrome.runtime.onMessage.addListener(async (e)=>{
    if(e.signal == "Copy" && document.URL.includes(".com/ip")){
        let wmJson = JSON.parse(wmData)
        let dom = new DOMParser()
        console.log(wmJson.props.pageProps.initialData.data)
        let title = wmJson.props.pageProps.initialData.data.product.name
        let description = dom.parseFromString(wmJson.props.pageProps.initialData.data.product.shortDescription,"text/html").querySelector("body").innerText ?? wmJson.props.pageProps.initialData.data.product.shortDescription
        let bullets = dom.parseFromString(wmJson.props.pageProps.initialData.data.idml.longDescription,"text/html").querySelector("body").innerText ?? wmJson.props.pageProps.initialData.data.idml.longDescription
        let brand = wmJson.props.pageProps.initialData.data.product.brand
        let keyitems = {
            dbrand: brand,
            cbullets: bullets,
            bdescription: description,
            atitle: title
        }
        // let textArea = document.createElement("textarea")
        // textArea.innerText = JSON.stringify(keyitems)
        // document.body.append(textArea)
        // textArea.focus({preventScroll: true})
        // textArea.select()
        // document.execCommand('Copy')
        // textArea.remove()
        chrome.storage.sync.set(keyitems)
    }
    
    if(e.signal == "Paste"){
        console.log(document.querySelector("#editor"))
        let elem = document.createElement('textarea')
        // titleD = await chrome.storage.sync.get("title")


        // description = await chrome.storage.sync.get("description")
        // elem.innerText = description.description
        // elem.focus({preventScroll: true})
        // elem.select()
        // document.execCommand("Copy")
        // elem.remove()
        
        // let descrSelector = document.querySelector("#requiredToListAttributesCard > div > div.Collapse-module_collapsible__qZm3J.overflow-y-visible > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.relative > div").children[1]
        // console.log(descrSelector.children[1])
        // console.log(description)
        // descrSelector.focus({preventScroll: true})
        // descrSelector.select()
        // document.execCommand('Paste')
    let arr = [
        document.querySelector("#requiredToListAttributesCard > div > div.Collapse-module_collapsible__qZm3J.overflow-y-visible > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div.TextField-module_container__qsU3E.grow.mr-8 > div").children[0],
        document.querySelector("#requiredToListAttributesCard > div > div.Collapse-module_collapsible__qZm3J.overflow-y-visible > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.relative > div").children[1],
        document.getElementById("editor"),
        document.querySelector("#requiredToListAttributesCard > div > div.Collapse-module_collapsible__qZm3J.overflow-y-visible > div > div > div > div:nth-child(4) > div.relative.mb-16 > div > div.TextField-module_container__qsU3E.grow.-mt-8.mr-8 > div").children[0]
    ]
     let dets = Object.entries(await chrome.storage.sync.get())
     let count = 0
     let timerOut = setInterval(()=>{
        count = count + 1
        console.log(dets[count - 1][1])
        console.log(document.querySelector("#editor > ul").children[0])

        elem.innerText = dets[count - 1][1]
        document.body.appendChild(elem)
        elem.click()
        elem.focus({preventScroll: true})
        elem.select()
        document.execCommand("Copy")
        elem.click()
        elem.remove()

           arr[count - 1] 
           arr[count - 1].focus()

        document.execCommand('Paste')

        if(count == Object.entries(dets).length){
            clearInterval(timerOut)
        }
        
     },1000)

}
})


