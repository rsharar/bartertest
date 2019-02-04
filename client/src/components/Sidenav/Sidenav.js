import React from "react";
import './style.css'
import Sidebar from "react-sidebar";
import { Link } from 'react-router-dom'


class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const sidebarStyle={
      root: {
        position: "absolute",
        top: 65,
        left: 0,
        right: "80%",
        bottom: 0,
        overflow: "hidden"
      },
      sidebar: {
        backgroundColor: "white",
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        transition: "transform .3s ease-out",
        WebkitTransition: "-webkit-transform .3s ease-out",
        willChange: "transform",
        overflowY: "auto"
      },
      content: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        transition: "left .3s ease-out, right .3s ease-out"
      },
      overlay: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: "hidden",
        transition: "opacity .3s ease-out, visibility .3s ease-out",
        backgroundColor: "rgba(0,0,0,.3)"
      },
      dragHandle: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        bottom: 0
      }
    };

    const btnStyle ={
      marginTop: "65px",
    }

    return (
      <Sidebar
        sidebar={
          <div id="sidebar-items">
            <Link to="/users/profile" className="sidebar-link">
              <h4>Profile</h4>
            </Link>
            <Link to="/users/items" className="sidebar-link">
            <h4>My Items</h4>
            </Link>
            <Link to="/users/messages" className="sidebar-link">
            <h4>Proposals</h4>
            </Link>
            <Link to="/users/post" className="sidebar-link">
            <h4>Post an Item</h4>
            </Link>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={sidebarStyle}
      >
        <button style={btnStyle} onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}

export default Sidenav;