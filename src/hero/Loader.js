// import heroes from "../assets/heroes.json";

const st = {
    heroes: [],
    _name_to_id: {},
};

export default async function fetchHeroes() {
    if (!JSON.parse(sessionStorage.getItem("heroes_fetched"))) {
        await getHeroes();
        sessionStorage.setItem("heroes", JSON.stringify(st.heroes));
        sessionStorage.setItem("heroes_fetched", JSON.stringify(true));
    } else {
        st.heroes = JSON.parse(sessionStorage.getItem("heroes"));
    }
    return st.heroes;
}
async function getHeroes() {
    // st.heroes = heroes;
    await (fetch("https://api.opendota.com/api/constants/heroes")
        .then(response => response.json())
        .then(heroes => processHeroes(heroes))
    );
    await (fetch("https://api.opendota.com/api/constants/hero_lore")
        .then(response => response.json())
        .then(lores => processLores(lores))
    );
    for (const hero of Object.values(st.heroes)) {
        hero.primary_attr = (
            hero.primary_attr === "str" ? "Strength" :
            hero.primary_attr === "agi" ? "Agility" :
            hero.primary_attr === "int" ? "Intelligence" :
            hero.primary_attr
        );
    }
}

function processHeroes(heroes) {
    st.heroes = heroes;
    st._name_to_id = {};
    for (const id in heroes) {
        if (Object.hasOwnProperty.call(heroes, id)) {
            const { name } = heroes[id];
            st._name_to_id[name] = id;
        }
    }
}

function processLores(lores) {
    for (const short_name in lores) {
        if (Object.hasOwnProperty.call(lores, short_name)) {
            const lore = lores[short_name];
            const id = st._name_to_id["npc_dota_hero_" + short_name];
            st.heroes[id].lore = lore;
        }
    }
}