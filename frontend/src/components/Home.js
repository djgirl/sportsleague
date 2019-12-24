import React, { Component } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import TeamList from './TeamList';
import TeamAdd from './TeamAdd';
import PlayerList from './PlayerList';

import MatchList from './MatchList';
import PointsTableList from './PointsTableList';

import LeftMenu from './LeftMenu';


export default class Home extends Component {
  render() {
    const Main = (
      <main>
        <Switch>
          <Route exact sensitive path="/teams/list" component={TeamList} />
          <Route exact sensitive path="/team/add" component={TeamAdd} />
          <Route exact sensitive path="/team/edit/:id" component={TeamAdd} />

          <Route exact sensitive path="/players/list" component={PlayerList} />

          <Route exact sensitive path="/matches/list" component={MatchList} />

          <Route exact sensitive path="/points-table/list" component={PointsTableList} />


        </Switch>
      </main>
    );

    return (
          

    <div className="col-md-12">
          <LeftMenu/>

          <div id="page-content-wrapper">
            { Main }
          </div>
      </div>
    );
  }
}
