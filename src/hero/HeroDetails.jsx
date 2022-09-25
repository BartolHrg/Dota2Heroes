import React from "react";
import { Link, useParams } from "react-router-dom";

import MyImage from "../MyImage";
import fetchHeroes from "./Loader";

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
class RealHeroDetails extends React.Component {
  constructor(props) {
    super(props);
    this.heroes = null;
    this.hero_id = Number(props.hero_id);
    this.state = {
      hero: null
    };
  }
  componentDidMount() {
    if (!this.heroes) {
      this.fetchHeroes();
    }
  }
  async fetchHeroes() {
    this.heroes = await fetchHeroes();
    this.setState({ hero: this.heroes[this.hero_id] });
  }
  render() {
    if (!this.state.hero) {
      return null;
    }
    const hero = this.state.hero;
    return (
      <div>
        <Link className="back-button" to={"/"}>⇐ All Heroes</Link>
        <div className="h1-parent">
          <h1><MyImage src={hero.icon} />{hero.localized_name}</h1>
        </div>
        <MyImage src={hero.img} />
        <div><em>Primary Attribute:</em> {hero.primary_attr}</div>
        <div><em>Attack Type:</em> {hero.attack_type}</div>
        <div><em>Roles:</em> {hero.roles.join(", ")}</div>
        <div>
          <h2>Attributes</h2>
          <table>
            <tr>
              <tr><td>Health</td><td>{hero.base_health} + {hero.base_health_regen}</td></tr>
              <tr><td>Mana</td><td>{hero.base_mana} + {hero.base_mana_regen}</td></tr>
              <tr><td>Armor</td><td>{hero.base_armor}</td></tr>
              <tr><td>Magic Resistance</td><td>{hero.base_mr}</td></tr>
              <tr><td>Attack</td><td>{hero.base_attack_min} - {hero.base_attack_max}</td></tr>
              <tr><td>Attack Range</td><td>{hero.attack_range}</td></tr>
              <tr><td>Attack Rate</td><td>{hero.attack_rate}</td></tr>
              {hero.projectile_speed !== 0 ? <tr><td>Projectile Speed</td><td>{hero.projectile_speed}</td></tr> : null}
              <tr><td>Strength</td><td>{hero.base_health} + {hero.base_health_regen}</td></tr>
              <tr><td>Agility</td><td>{hero.base_health} + {hero.base_health_regen}</td></tr>
              <tr><td>Intelligence</td><td>{hero.base_health} + {hero.base_health_regen}</td></tr>
              <tr><td>Move Speed</td><td>{hero.move_speed}</td></tr>
              {hero.turn_rate ? <tr><td>Turn Rate</td><td>{hero.turn_rate}</td></tr> : null}
              <tr><td>Legs</td><td>{hero.legs}</td></tr>
              {/* <tr><td>CM Enabled?</td><td>{hero.cm_enabled}</td></tr> */}
            </tr>
          </table>
        </div>
        <div>
          <h2>Lore</h2>
          {hero.lore}
        </div>
      </div>
    );
  }
  
}
export default function HeroDetails() {
  let { hero_id } = useParams();
  return <RealHeroDetails hero_id={hero_id} />;
}