const fetchPokemon = (name) =>{
    const url = 'https://pokeapi.co/api/v2/pokemon/'+name;
    fetch(url).then(
        (res) =>{
            if( res.status != '200' ){
                changeImage('assets/img/err.gif', null);
            }else{
                return res.json();
            }
        }
    ).then( (data) =>{
        console.log(data);
        setData( getData(data) );
        /*screen.innerHTML = `<div>
                                <img style= "transform: scale(200%, 200%); image-rendering: pixelated; " src="${data.sprites.front_default}">
                            </div>`;
        console.log(screen.innerHTML);*/
    } );
};

const buttonSend = document.querySelector('.controls button'); 
const input = document.querySelector('.controls input');
const screen = document.querySelector('.screen');
const image = document.querySelector('.screen div:nth-child(1) img');

const send = buttonSend.addEventListener('click', ()=>{
    if( input.value != '' ){
        fetchPokemon(input.value.toLowerCase());
    }else{
        changeImage('assets/img/err.gif', null);
    }
});
let changeImage = (url, defaulStyle = "/*transform: scale(200%, 200%);*/ height: 50%; width: 50%; object-fit: contain; image-rendering: hight-quality; ") =>{
    image.src = url;
    image.style = defaulStyle;
}
const setData = ( data ) => {
    const type = document.querySelector('.statistics-container .top span');
    const tipe1 = document.querySelector('.tipe1');
    const tipe2 = document.querySelector('.tipe2');
    
    const hp = document.querySelector('.ps');
    const attack = document.querySelector('.atk');
    const def = document.querySelector('.def');
    const saAtk = document.querySelector('.sa-atk');
    const saDef = document.querySelector('.sa-def');
    const speed = document.querySelector('.sp');

    const height = document.querySelector('.height');
    const weight = document.querySelector('.weight');

    changeImage(data.img);
    tipe1.innerText = data.abilities[0];
    tipe2.innerText = data.abilities[1];
    type.innerText = data.type;
    
    hp.innerText = data.stats.hp.base_stat;
    attack.innerText = data.stats.attack.base_stat;
    def.innerText = data.stats.defense.base_stat;
    saAtk.innerText = data.stats["special-attack"].base_stat;
    saDef.innerText = data.stats["special-defense"].base_stat;
    speed.innerText = data.stats.speed.base_stat;

    height.innerText = data.height;
    weight.innerText = data.weight;
}
const getData = ( data )=>{
    let objet ={};
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    const type =  getType( data.types );
    const abilities = getAbilities( data.abilities ); //array
    const stats = getStats( data.stats ); //array
    
    objet['img'] = data.sprites.other["official-artwork"].front_default;
    objet['name'] = name;
    objet['height'] = height;
    objet['weight'] = weight;
    objet['type'] = type; 
    objet['abilities'] = abilities;
    objet['stats'] = stats;
    console.log(objet);
    return objet;
}
const getType = ( types ) => {
    return types[0].type.name; 
}
const getStats = ( stats ) => {
    return {
        'hp':{
            'base_stat': stats[0].base_stat,
            'effort': stats[0].effort
        },
        'attack':{
            'base_stat': stats[1].base_stat,
            'effort': stats[1].effort
        },
        'defense':{
            'base_stat': stats[2].base_stat,
            'effort': stats[2].effort
        },
        'special-attack':{
            'base_stat': stats[3].base_stat,
            'effort': stats[3].effort
        },
        'special-defense':{
            'base_stat': stats[4].base_stat,
            'effort': stats[4].effort
        },
        'speed':{
            'base_stat': stats[5].base_stat,
            'effort': stats[5].effort
        }
    };
}
const getAbilities = ( abilities ) => {
    let obj = [];
    for( var i = 0; i < abilities.length; i++ ){
        obj.push(abilities[i].ability.name);
    }
    return obj;
}
