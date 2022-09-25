import React from "react";
import { useNavigate } from "react-router-dom";

import "./HeroList.css";
import MyImage from "../MyImage";
import fetchHeroes from "./Loader";

class RealHeroListItem extends React.Component {
  constructor(props) {
    super(props);
    // this.state = props.my_data;
    this.data = props.my_data;
    this.showDetails = this.showDetails.bind(this);
  }
  showDetails() {
    this.props.history.push(`/${this.data.id}`);
  }
  render() {
    return (
      <tr onClick={this.showDetails}>
        {/* <td><MyImage src={this.data.icon} /></td> */}
        <td>{this.data.localized_name}</td>
        <td>{this.data.primary_attr}</td>
        <td>{this.data.attack_type}</td>
      </tr>
    );
  }
}
function HeroListItem(props) {
  let nav = useNavigate();
  function p(path) {
    nav(path);
  }
  let h = { push: p };
  return <RealHeroListItem history={h} my_data={props.my_data} />
}
export default class HeroList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: []
    };
    this.heroes = null;
  }
  render() {
    return (
      <table className="HeroList">
        <thead>
          <tr>
            {/* <th>Icon</th> */}
            <th>Name</th>
            <th>Primary Attr.</th>
            <th>Attack Type</th>
          </tr>
        </thead>
        <tbody>
          {this.state.heroes 
            ? Object.values(this.state.heroes).map(hero_data => <HeroListItem key={hero_data.id.toString()} my_data={hero_data}></HeroListItem>)
            : null
          }
        </tbody>
      </table>
    );
  }
  componentDidMount() {
    if (!this.heroes) {
      this.fetchHeroes();
    }
  }
  async fetchHeroes() {
    this.heroes = await fetchHeroes();
    this.setState({ heroes: this.heroes });
  }
}
