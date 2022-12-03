const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");

const classComplimentsBtn = document.getElementById("classComplimentButton");
const complimentContainer = document.getElementById("complimentContainer");

const newComplimentBtn = document.createElement("newComplimentButton");
const newComplimentContainer = document.getElementById("newComplimentContainer");
const form = document.querySelector('form')

const clearBtn = document.getElementById("clear");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getClassCompliments = () => {
    axios.get("http://localhost:4000/api/compliments/classmates")
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
};

const complimentDisplay = (results) => {
    let cards = ``;
    for (let i = 0; i < results.length; i++) {
        cards += `
            <div class = "card">
                <p class = "name">Name: ${results[i].name}</p>
                <p class = "encouragement">Encouragement: ${results[i].encouragement}</p>
                <p>------------------------------------------------------------------------</p>
            </div>
        `;
    }
    complimentContainer.innerHTML = cards;
};

const clearDisplay = () => {
    complimentContainer.innerHTML = ``;
};

const submitHandler = (event) => {
    event.preventDefault() 

    let name = document.querySelector('#firstName')
    let encouragement = document.querySelector('#newCompliment')

    let newCompliment = {
        name: name.value,
        encouragement: encouragement.value,
    }

    postNewCompliment(newCompliment)

    name.value = ''
    encouragement.value = ''
}

const postNewCompliment = (body) => {
    axios.post("http://localhost:4000/api/compliments/classmates", body)
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
            console.log(data);
        })
        .catch(err => console.log(err))
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
classComplimentsBtn.addEventListener('click', getClassCompliments);
clearBtn.addEventListener('click', clearDisplay);
form.addEventListener('submit', submitHandler)
newComplimentBtn.addEventListener('click', postNewCompliment);