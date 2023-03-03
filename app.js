const spinner = document.getElementById("spinner");

let datesSort = [];

// fetch data
const ai = async(showall,dateSort)=>{
    try{
        const req = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data = await req.json();
        const datas =  data.data.tools;
        datesSort = datas;
        console.log(dateSort);
        
        if(showall){
            if(dateSort){

                console.log("entered else", dateSort);
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
    div.classList = "border-2 p-6 card rounded-xl text-left";
    const {id, image, features, name, published_in} = data
    div.innerHTML=`
    <img class="mb-6 h-64 w-full rounded-md" src="${image}" alt="">
    <div class="border-b-2 pb-4">
        <p class="mb-3 text-xl font-semibold">Features</p>
        <ol class="list-decimal ml-5">
        <li class="text-gray-600 ${features[0] ? "" : "hidden"} text-sm">${features[0] ? features[0] : ""}</li>
            <li class="text-gray-600 ${features[1] ? "" : "hidden"} text-sm">${features[1] ? features[1] : ""}</li>
            <li class="text-gray-600 ${features[2] ? "" : "hidden"} text-sm">${features[2] ? features[2] : ""}</li>
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
const showModal = async(id)=>{
    modal.classList.remove("hidden");
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