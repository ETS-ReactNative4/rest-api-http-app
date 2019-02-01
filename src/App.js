import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const response = await axios.get(url);
    console.log(this.state.posts);
    this.setState({ posts: response.data });
  }

  handleAdd = async () => {
    const myPost = {
      title: "aaaa",
      body: "bbbb"
    };
    const response = await axios.post(url, myPost);
    const posts = [response.data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    const response = await axios.put(url + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = response.data;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(url + "/" + post.id);
    } catch (error) {
      alert("Could not delete the post!");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
