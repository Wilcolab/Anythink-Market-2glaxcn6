import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ITEM_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from "../constants/actionTypes";
import { withRouterParams } from "./commons";

const mapStateToProps = (state) => ({
  ...state.editor,
  isVerified: state.editor.item ? state.editor.item.isVerified : false
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: ITEM_SUBMITTED, payload }),
  onUnload: (payload) => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
  onUpdateIsVerified: (value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key: "isVerified", value }),
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent = (key) => (ev) =>
      this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent("title");
    this.changeDescription = updateFieldEvent("description");
    this.changeImage = updateFieldEvent("image");
    this.changeTagInput = updateFieldEvent("tagInput");

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = (tag) => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      const item = {
        title: this.props.title,
        description: this.props.description,
        image: this.props.image,
        tagList: this.props.tagList,
        isVerified: this.props.isVerified,
      };

      const slug = { slug: this.props.itemSlug };
      const promise = this.props.itemSlug
        ? agent.Items.update(Object.assign(item, slug))
        : agent.Items.create(item);

      this.props.onSubmit(promise);
    };
  }

  changeIsVerified = (ev) => {
    const value = ev.target.checked;
    this.props.onUpdateIsVerified(value);
  };

  componentDidUpdate(prevProps) {
    if (this.props.params.slug !== prevProps.params.slug) {
      if (this.props.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Items.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentDidMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Items.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Item Title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="What's this item about?"
                      value={this.props.description}
                      onChange={this.changeDescription}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Image url"
                      value={this.props.image}
                      onChange={this.changeImage}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={this.props.isVerified}
                        onChange={this.changeIsVerified}
                      />
                      <span className="form-check-label">Verified</span>
                    </label>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />

                    <div className="tag-list pt-2">
                      {(this.props.tagList || []).map((tag) => {
                        return (
                          <span
                            className="badge badge-pill badge-secondary p-2 mx-1"
                            key={tag}
                          >
                            <i
                              className="ion-close-round p-1"
                              onClick={this.removeTagHandler(tag)}
                            ></i>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Item
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouterParams(Editor));
