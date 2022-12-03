const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const classComplimentsBtn = document.getElementById("classComplimentButton");

const complimentContainer = document.getElementById("classmate-container");

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

let complimentArray = [];

const getClassCompliments = () => {
    axios.get("http://localhost:4000/api/compliments/classmates")
        .then(res => {
            const data = res.data;
            complimentArray = data.results
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
}

const complimentDisplay = (results) => {
    let cards = ``;
    for (let i = 0; i < results.length; i++) {
        cards += `
            <div class = "card">
                <p class = "id">Id: ${results[i].id}</p>
                <p class = "name">Name: ${results[i].name}</p>
                <p class = "encouragement">Encouragement: ${results[i].encouragement}</p>
            </div>
        `;
    }
    complimentContainer.innerHTML = cards;
}

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
classComplimentsBtn.addEventListener('click', getClassCompliments);