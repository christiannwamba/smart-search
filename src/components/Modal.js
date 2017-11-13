import React from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import './Modal.css';

const modalClass = isActive =>
  classNames({
    modal: true,
    'is-active': isActive
  });

export default ({
  isActive,
  toggleModal,
  onDrop,
  saveImage,
  preview,
  description,
  pending,
  handleDescriptionChange
}) => {
  const dropZoneProps = {
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    multiple: false
  };
  return (
    <div className={modalClass(isActive)}>
      <div className="modal-background" onClick={toggleModal} />
      <div className="modal-content">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Upload an image!</p>
            <button
              onClick={toggleModal}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Short Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Textarea"
                    />
                  </div>
                  <button
                    onClick={saveImage}
                    className="button is-info is-margin-top"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="column upload-column">
                {!preview ? (
                  <div className="dropzone-wrapper">
                    <Dropzone {...dropZoneProps}>
                      <p>
                        Try dropping some files here, or click to select files
                        to upload.
                      </p>
                    </Dropzone>
                  </div>
                ) : (
                  <img src={preview} alt="Preview" />
                )}
                <div
                  className="mainImageLoading"
                  style={{ display: pending ? 'block' : 'none' }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <button
        onClick={toggleModal}
        className="modal-close is-large"
        aria-label="close"
      />
    </div>
  );
};
