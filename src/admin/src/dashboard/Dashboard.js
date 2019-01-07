import React, { Component, Fragment } from "react";
import { GET_LIST, GET_MANY, Responsive, Title } from "react-admin";
import axios from "axios";
import Welcome from "./Welcome";
import User from "./User";
import Group from "./Group";
import PendingOrders from "./PendingOrders";
import Post from "./Post";
import Comment from "./Comment";
import dataProviderFactory from "../dataProvider";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em", marginBottom: "2em" },
};

class Dashboard extends Component {
  state = {
    data: {
      count_user: 0,
      count_group: 0,
      count_post: 0,
      count_comment: 0,
    },
    dataChart: [],
  };

  async componentDidMount() {
    if (this.props.dataProvider) {
      try {
        const data = await this.props.dataProvider(GET_LIST, "statistic");
        console.log("datgaaa", data.data[1]);
        this.setState({ data: data.data[0][0], dataChart: this.convertDataChart(data.data[1])});
      } catch (error) {}
    }
  }
  convertDataChart(dataChart) {
    let data = [];
  
    if (dataChart) {
      console.log('datachartxxxx',dataChart)
      data[0] = ["x", "Bài đăng"];
      let i =1;
      for(var index in dataChart){
         let item = dataChart[index]
          let x = item.day + "-" + item.Month + "-" + item.Year;
          let row =  [x, item.count];
          data[i] = row;
          i = i+1;
        
      };
      return data;
    }
    else{
      return dataChart;
    }
  }
  render() {
    const {
      // nbComment,
      // Group,
      // nbPost,
      // Comment,
      // pendingOrders,
      // pendingOrdersCustomers,
      // Post,
      // PostCustomers,
      // revenue,
      data,
      dataChart,
    } = this.state;
    let { count_group, count_post, count_user, count_comment } = data;
    console.log("data", count_group, count_post, count_user);
    return (
      <Fragment>
        <Title title="Agiletech Admin" />
        <Responsive
          xsmall={
            <div>
              <div style={styles.flexColumn}>
                <div style={{ marginBottom: "2em" }}>
                  <Welcome />
                </div>
                <div style={styles.flex}>
                  <User value={count_user} />
                  <Group value={count_group} />
                </div>
                <div style={styles.singleCol}>
                  <PendingOrders
                    value={count_post}
                    orders={count_post}
                    // customers={pendingOrdersCustomers}
                  />
                </div>
              </div>
            </div>
          }
          small={
            <div style={styles.flexColumn}>
              <div style={styles.singleCol}>
                <Welcome />
              </div>
              <div style={styles.flex}>
                <User value={count_user} />
                <Group value={count_group} />
              </div>
              <div style={styles.singleCol}>
                <PendingOrders
                  value={count_post}
                  orders={count_post}
                  // customers={pendingOrdersCustomers}
                />
              </div>
            </div>
          }
          medium={
            <div style={styles.flex}>
              <div style={styles.leftCol}>
                <div style={styles.flex}>
                  <User value={count_user} />
                  <Group value={count_group} />
                </div>
                <div style={styles.singleCol}>
                  <Welcome dataChart={dataChart} />
                </div>
                <div style={styles.singleCol}>
                  <PendingOrders
                    value={count_post}
                    // orders={count_post}
                    // customers={pendingOrdersCustomers}
                  />
                </div>
              </div>
              <div style={styles.rightCol}>
                <div style={styles.flex}>
                  <Post
                    value={count_post}
                    // reviews={Post}
                    // customers={PostCustomers}
                  />
                  <Comment
                    value={count_comment}
                    // nb={nbComment}
                    // visitors={Comment}
                  />
                </div>
              </div>
            </div>
          }
        />
      </Fragment>
    );
  }
}

export default Dashboard;
