const spinner = document.getElementById("spinner");

let datesSort = [];

// fetch data
const ai = async(showall,dateSort)=>{
    try{
        const req = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data = await req.json();
        const datas =  data.data.tools;
        datesSort = datas;
        
        if(showall){

            if(dateSort){
                dateSort.map(data => displayAllAi(data));
                spinner.classList.add("hidden");

            }
            else{
                datas.map(data => displayAllAi(data));
                spinner.classList.add("hidden");
            }
           
        }
        else{
            if(dateSort){
                dateSort.slice(0,6).map(data => displayAllAi(data));
                seeMore.classList.remove("hidden");
                spinner.classList.add("hidden");
         
            }
            else{
                datas.slice(0,6).map(data => displayAllAi(data));
                seeMore.classList.remove("hidden");
                spinner.classList.add("hidden");
            }
            
        }
    }
    catch(error){
        console.log(error);
    }
}


// date sorting
const sortCustom = (a , b)=>{
    const date1 = new Date(a.published_in);
    const date2 = new Date(b.published_in);

    if(date1 > date2){
        return 1;
    }
    else if(date1 < date2){
        return -1;
    }
    else{
        return 0;
    }
}

let connectShowAll = [];
const sortByDate = document.getElementById("sort-date");
sortByDate.addEventListener("click",function(){
    cards.innerText='';
    const sorted = datesSort.sort(sortCustom);
    if(connectToSort){
        ai(true,sorted);
    }
    else{
        ai("",sorted);
    }
   
    connectShowAll = sorted;
})



const cards = document.getElementById("cards");

// display all cards
const displayAllAi = data =>{

    const div = document.createElement("div");
    let li = "";
    data.features.forEach(element => {
        li += `<li class="text-gray-600 text-sm">${element}</li>`
    });
    div.classList = "border-2 p-6 card rounded-xl text-left";
    const {id, image, features, name, published_in} = data
    div.innerHTML=`
    <img class="mb-6 h-64 w-full rounded-md" src="${image}" alt="">
    <div class="border-b-2 pb-4">
        <p class="mb-3 text-xl font-semibold">Features</p>
        <ol class="list-decimal ml-5">
            ${li}
        </ol>
        
    </div>

    <div class="mt-4 flex justify-between items-center">
        <div>
            <p class="mb-3 text-xl font-semibold">${name}</p>
            <p class="flex gap-2">
                <img src="icons/icons8-tear-off-calendar-25.png" alt="">
                ${published_in}
            </p>
        </div>
        <button onclick="showModal('${id}')" class="bg-red-100 w-10 h-10 text-center rounded-full">
            <img class="w-4 mx-auto" src="icons/icons8-right-arrow-30.png" alt="">
        </button>
    </div>
    `;
    cards.appendChild(div);
}

// Modal
const modal = document.getElementById("modal");
const modalLeft = document.getElementById("modal-left");
const modalRight = document.getElementById("modal-right");
const spinnerModal = document.getElementById("spinnerModal");
const showModal = async(id)=>{
    modal.classList.remove("hidden");

    let idData = {};
    try{
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const req = await fetch(url);
        const data = await req.json();
        idData = data.data;
    }
    catch(error){
        console.log(error);
    }

    let {description, pricing, features, integrations, image_link, input_output_examples, accuracy} = idData;

    let accuracyInt = accuracy.score * 100;

    let featuresLi = ""
    for(let singleFeature in features){
        featuresLi += `<li class="text-gray-600 text-sm">${features[singleFeature].feature_name}</li>`
    }

    let integrationsLi = '';
    if(integrations){
        integrations.forEach(element => {
            integrationsLi += `<li class="text-gray-600 text-sm">${element}</li>`
        });
    }
    else{
        integrationsLi = `<li>No Data Found.</li>`
    }
    


    // modal left dynamic html
    modalLeft.innerHTML=`
    <p class="mb-5 w-11/12 text-xl font-semibold">${description}</p>
        <div class="flex justify-between mb-4">
            <div class="flex items-center p-4 h-24 w-28 rounded-2xl text-center bg-white font-semibold text-green-600">
                <p class="leading-5">${pricing ? pricing[0].price === "No cost" ? "Free Of Cost /" : pricing[0].price == 0 ? "$0/month" : pricing[0].price : "Free Of Cost /"}
                    Basic
                </p>
            </div>
            <div class="flex items-center p-4 h-24 w-28 rounded-2xl text-center bg-white font-semibold text-yellow-600">
                <p class="leading-5">${pricing ?pricing[1].price === "No cost" ? "Free Of Cost /" : pricing[1].price : "Free Of Cost /"}
                        Pro
                </p>
            </div>
            <div class="flex items-center p-4 h-24 w-28 font-semibold text-red-600 rounded-2xl text-center bg-white">
                <p class="leading-5">
                    ${pricing ?pricing[2].price === "No cost" ? "Free Of Cost /" : pricing[2].price : "Free Of Cost /"}
                    ${pricing ? pricing[2].plan : "Enterprise"}
                </p>
            </div>
        </div>
        <div class="flex justify-between">
            <div>
                 <p class="mb-3 text-xl font-semibold">Features</p>
                    <ul class="ml-6 list-disc">
                         ${featuresLi}
                    </ul>
            </div>
        <div>
            <p class="mb-3 text-xl font-semibold">Integrations</p>
                <ul class="ml-6 mr-3 list-disc">
                     ${integrationsLi}
                </ul>
            </div>
        </div>
    `

    // modal right dynamic html

    modalRight.innerHTML=`
    <div class="relative">
        <img class="mb-5 rounded-lg" src="${image_link[0]}" alt="">
        <div class="${accuracy.score ? '' : 'hidden'} rounded-xl px-3 py-2 bg-red-500 text-white w-fit absolute top-2 right-2 text-sm">
            <p>${accuracyInt}% accuracy</p>
        </div>
    </div>
    <p class="mb-4 text-xl font-semibold">${input_output_examples ? input_output_examples[0].input : "Can you give any example?"}</p>
    <p>${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
    `

    spinnerModal.classList.add("hidden");

}

document.querySelector(".modal-close").addEventListener("click",function(){
    modal.classList.add("hidden");
})


// show all
let connectToSort = "";
const seeMore = document.getElementById("seeMore");
seeMore.addEventListener("click", function(){
    if(connectShowAll.length == 0){
        ai(true,false);
    }
    else{
        ai(true,connectShowAll)
    }
    seeMore.classList.add("hidden");
    spinner.classList.remove("hidden");
    cards.innerText='';
    connectToSort = true;
})

ai(false,false);