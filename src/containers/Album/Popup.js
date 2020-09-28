import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import moment from 'moment';

import UploadImage from '../../assets/images/cover_upload.png';
import cancelImage from '../../assets/images/cancel-24px.svg';
import { getBase64, beforeUpload } from '../../helpers/methods';
import { CreateAlbums } from '../../services/expert';

const uploadButton = (
  <div>
    <img
      src={UploadImage}
      alt='cover'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'fill',
      }}
    />
  </div>
);

const Popup = React.memo((props) => {
  const token = useSelector((state) => state.auth.accessToken);

  const [imageUrl, setImageUrl] = useState();
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [pictures, setPictures] = useState([]);
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState([]);

  const { loading, visible, title, handleOk, handleCancel } = props;
  const { getFieldDecorator, setFieldsValue } = props.form;

  useEffect(() => {
    setFieldsValue({
      pictures,
      caption,
      date,
      location,
    });
  }, [setFieldsValue, pictures, caption, date, location]);

  const handleChangePicture = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      setPictures([...pictures, info.file]);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };
  const onSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(ll => setLatLng(ll))
      .catch(error => console.error('Error', error));
  }

  const onChange = (address) => setAddress(address);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const formData = new FormData();
        values.pictures.map((pic) => {
          formData.append("pictures", pic.originFileObj);
        });
        formData.append('caption', values.caption);
        formData.append('date', moment(values.date).format('YYYY-MM-DD[T00:00:00.000Z]'));
        formData.append('location', JSON.stringify({ coordinates: [latLng.lng, latLng.lat] }));
        const result = await CreateAlbums(token, formData);
        if (result) {
          handleOk();
          setImageUrl('');
          setPictures([]);
          setAddress('');
          setCaption('');
        }
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      className="header_text"
    >
      <div className='step-1-expert-form height_sec_enthu learn_sec'>
        <Form onSubmit={handleSubmit}>
          <div className='form-profile-container pt20'>
            <Form.Item label='' className='mb20'>
              {getFieldDecorator('pictures', {
                rules: [{ required: true, message: 'Please Upload Images!' }],
              })(
                <>
                  <Upload
                    name='avatar'
                    multiple={true}
                    className='album-uploader-main'
                    showUploadList={false}
                    onChange={handleChangePicture}
                    beforeUpload={beforeUpload}
                    customRequest={({ file, onSuccess }) =>
                      setTimeout(() => onSuccess('ok'), 0)
                    }
                  >
                    <div className='flex-y center'>
                      <img
                        src={imageUrl || UploadImage}
                        alt='cover'
                        style={{
                          width: imageUrl ? '100%' : '',
                          height: imageUrl ? '100%' : '',
                          objectFit: 'fill',
                        }}
                      />
                      {!imageUrl && (
                        <span className='an-14 regular-text mt20'>
                          Drag & Drop/Click here to upload multiple Image
                        </span>
                      )}
                    </div>
                  </Upload>
                </>,
              )}
              <Upload
                listType='picture-card'
                multiple={true}
                showUploadList={{ showPreviewIcon: false, showDownloadIcon: false }}
                onChange={handleChangePicture}
                beforeUpload={beforeUpload}
                customRequest={({ file, onSuccess }) =>
                  setTimeout(() => onSuccess('ok'), 0)
                }
                className="uplord_img"
              >
                {pictures.length > 0 && uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label=''>
              {getFieldDecorator('caption', {
                rules: [{ required: true, message: 'Please Enter Caption.' }],
              })(<Input type='text' min={1} placeholder='Write Caption..' />)}
            </Form.Item>
            <Row gutter={24} className="album_date">
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label=''>
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Please Enter Date.' }],
                  })(
                    <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" disabledDate={(current) => current && current.valueOf() > Date.now()} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label=''>
                  <PlacesAutocomplete value={address} onChange={onChange} onSelect={onSelect} >
                    {
                      ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <Input
                            {...getInputProps({
                              placeholder: 'Search Locations ...',
                              className: 'location-search-input',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div style={{ marginTop: 20 }}>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                              return (
                                <div {...getSuggestionItemProps(suggestion, { className })}>
                                  <span>{suggestion.description}</span><br />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                  </PlacesAutocomplete>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className="uplord_button text-right">
              <Button
                htmlType='submit'
                type='primary'
                className='ant-btn ex__primary_btn text-upper ant-btn-primary'
                loading={loading}
              >
                Upload
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
});

export default Form.create({ name: 'album' })(Popup);
