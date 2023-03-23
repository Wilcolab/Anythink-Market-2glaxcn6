import React, { useEffect } from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import ItemList from "./../ItemList";
import Tags from "./Tags";
import agent from "../../agent";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

const Home = ({
  onLoad,
  onUnload,
  tags,
  onClickTag,
  items,
  tagFilter,
  onTitleSearch,
}) => {
  useEffect(() => {
    const itemsPromise = agent.Items.all({ title: "" });
    onLoad(
      "all",
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise])
    );
    return onUnload;
  }, [onLoad, onUnload]);

  const handleTitleSearch = (e) => {
    e.preventDefault();
    onTitleSearch(e.target.elements.searchBox.value);
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <ItemList items={items} />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={tags} tagFilter={tagFilter} onClickTag={onClickTag} />
              <hr />
              <div className="search">
                <p>Search Articles</p>
                <form onSubmit={handleTitleSearch}>
                  <input
                    type="text"
                    name="searchBox"
                    id="search-box"
                    className="form-control"
                    placeholder="Search articles"
                  />
                  <button className="btn btn-outline-secondary mt-3">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
