const ai = async(showall)=>{
    try{
        const req = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data = await req.json();
        const datas =  data.data.tools;
        if(showall){
           datas.map(data => displayAllAi(data));
        }
        else{
            datas.slice(0,6).map(data => displayAllAi(data));
        }
    }
    catch(error){
        console.log(error);
    }
}

const cards = document.getElementById("cards");

const displayAllAi = data =>{

    const div = document.createElement("div");
    div.classList = "border-2 p-6 card rounded-xl text-left"
    div.innerHTML=`
    <img class="mb-6 h-64 w-full" src="Rectangle 23.png" alt="">
    <div class="border-b-2 pb-4">
        <p class="mb-3 text-xl font-semibold">Features</p>
        <p class="text-gray-600 text-sm">sfdf</p>
        <p class="text-gray-600 text-sm">dfgsdg</p>
        <p class="text-gray-600 text-sm">sfgdsfg</p>
    </div>

    <div class="mt-4 flex justify-between items-center">
        <div>
            <p class="mb-3 text-xl font-semibold">ChatGPT</p>
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

ai();