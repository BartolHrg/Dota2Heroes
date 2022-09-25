import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import HeroList from "./hero/HeroList";
import HeroDetails from "./hero/HeroDetails";
// import HeroAllData from "./hero/HeroAllData";

/*
  struct Hero {
    id: ID
    name: string
    localized_name: string
    primary_attr: string
    attack_type: string
    roles: string[]
    img: url
    icon: url
    base_health: number
    base_health_regen: number
    base_mana: number
    base_mana_regen: number
    base_armor: number
    base_mr: number
    base_attack_min: number
    base_attack_max: number
    base_str: number
    base_agi: number
    base_int: number
    str_gain: number
    agi_gain: number
    int_gain: number
    attack_range: number
    projectile_speed: number
    attack_rate: number
    move_speed: number
    turn_rate: number
    cm_enabled: bool
    legs: int
    lore: string
  }
*/
sessionStorage.setItem("heroes_fetched", JSON.stringify(false));
sessionStorage.setItem("heroes", JSON.stringify([]));

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
	render() {
	  return (
      <>
        <div className="background" />
        <div className="body">
          <BrowserRouter>
            <Routes>
            <Route path='/'>
              <Route index element={<HeroList />} />
              <Route path=':hero_id' element={<HeroDetails />} />
              {/* <Route path='all' element={<HeroAllData />} /> */}
            </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </>
	  );
	}
}
  