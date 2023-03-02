const spinner = document.getElementById("spinner");

const ai = async(showall)=>{
    try{
        const req = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data = await req.json();
        const datas =  data.data.tools;
        if(showall){
           datas.map(data => displayAllAi(data));
           spinner.classList.add("hidden");
        }
        else{
            datas.slice(0,6).map(data => displayAllAi(data));
            seeMore.classList.remove("hidden");
            spinner.classList.add("hidden");
        }
    }
    catch(error){
        console.log(error);
    }
}

const cards = document.getElementById("cards");

const displayAllAi = data =>{

    const div = document.createElement("div");
    div.classList = "border-2 p-6 card rounded-xl text-left";
    const {image, features, name} = data
    div.innerHTML=`
    <img class="mb-6 h-64 w-full rounded-md" src="${image}" alt="">
    <div class="border-b-2 pb-4">
        <p class="mb-3 text-xl font-semibold">Features</p>
        <ol class="list-decimal ml-5">
            <li class="text-gray-600 text-sm">${features[0]}</li>
            <li class="text-gray-600 text-sm">${features[1]}</li>
            <li class="text-gray-600 text-sm">${features[2]}</li>
        </ol>
        
    </div>

    <div class="mt-4 flex justify-between items-center">
        <div>
            <p class="mb-3 text-xl font-semibold">${name}</p>
            <p>
                <img src="icons/icons8-tear-off-calendar-25.png" alt="">
            </p>
        </div>
        <button class="bg-red-100 w-10 h-10 text-center rounded-full">
            <img class="w-4 mx-auto" src="icons/icons8-right-arrow-30.png" alt="">
        </button>
    </div>
    `;
    cards.appendChild(div);
}

const seeMore = document.getElementById("seeMore");
seeMore.addEventListener("click", function(){
    ai(true);
    seeMore.classList.add("hidden");
    spinner.classList.remove("hidden");
})

ai();