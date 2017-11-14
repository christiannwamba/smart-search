import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  InfiniteHits
} from 'react-instantsearch/dom';
import axios from 'axios';

import ImageList from './components/ImageList';
import Modal from './components/Modal';
import './App.css';
// var cloudinary = "";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsActive: false,
      preview: '',
      previewPublicId: '',
      description: '',
      previewPayload: '',
      pending: false
    };

    this.requestURL =
      'https://wt-nwambachristian-gmail_com-0.run.webtask.io/ai-search';
    this.cl = window.cloudinary;
    this.uploadWidget = this.cl.createUploadWidget(
      { cloud_name: 'christekh', upload_preset: 'idcidr0h' },
      (error, [data]) => {
        console.log(data);
        this.setState({
          preview: data.secure_url,
          previewPayload: data,
          previewPublicId: data.public_id
        });
      }
    );

    this.toggleModal = this.toggleModal.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDropZoneClick = this.handleDropZoneClick.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsActive: !this.state.modalIsActive });
  }

  handleDropZoneClick(event) {
    this.uploadWidget.open();
  }

  handleDescriptionChange(event) {
    const { value } = event.target;
    if (value.length <= 150) {
      this.setState({ description: value });
    }
  }

  saveImage() {
    const payload = Object.assign(this.state.previewPayload, {
      description: this.state.description
    });
    this.setState({ pending: true });
    // Post to server
    axios.post(this.requestURL + '/save', payload).then(data => {
      // Set preview state with uploaded image
      this.setState({ pending: false });
      this.toggleModal();
    });
  }

  render() {
    return (
      <div className="App">
        <InstantSearch
          appId="TBD94M93EW"
          apiKey="e5cc0ddac97812e91b8459b99b52bc30"
          indexName="ai_search"
        >
          <section className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <h1 className="title">Smart Search</h1>
                        <h2 className="subtitle">
                          Smart auto tagging & search. Search results depend on
                          images' actual contents.
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <button
                        onClick={this.toggleModal}
                        className="button is-info is-inverted is-medium"
                      >
                        Add a new image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="hero is-light">
            <div className="hero-body">
              <div className="container search-wrapper">
                <SearchBox />
              </div>
            </div>
          </section>
          <InfiniteHits hitComponent={ImageList} />
          <Modal
            isActive={this.state.modalIsActive}
            toggleModal={this.toggleModal}
            onDrop={this.onDrop}
            preview={this.state.preview}
            description={this.state.description}
            handleDescriptionChange={this.handleDescriptionChange}
            saveImage={this.saveImage}
            pending={this.state.pending}
            handleDropZoneClick={this.handleDropZoneClick}
          />
        </InstantSearch>
      </div>
    );
  }
}

export default App;
