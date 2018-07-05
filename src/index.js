/**
 * 手动上传组件
 */

import React, { Component } from 'react';
import { Modal, Button, Icon, Upload, Message, Loading, Table, Popconfirm, ProgressBar } from 'tinper-bee';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    multiple: PropTypes.bool,
    action: PropTypes.string,
    showUploadList: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object
};

class AcUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.uploadProps = {
            name: props.name,
            multiple: props.multiple,
            showUploadList: props.showUploadList,
            action: props.action,
            accept: props.accept,
            defaultFileList: this.defaultFileListToList(props.defaultFileList),
            onChange: (msg) => {
                if (msg.file.status == 'done' && msg.file.response.status == 1) {
                    props.onSuccess && props.onSuccess(msg.file.response.data);
                }
                if (msg.file.status == 'error') {
                    props.onError && props.onError();
                }
                if (msg.file.status == 'uploading') {
                    console.log('uploading');
                }
                if (msg.file.status == 'removed') {
                    console.log(msg);
                    // props.onSuccess && props.onSuccess();
                }
            }
        };

    }

    defaultFileListToList = (_list) => {
        let newData = [];
        if (Array.isArray(_list)) {
            for (let i = 0; i < _list.length; i++) {
                  newData.push({
                    uid : _list[i].fileName,
                    name : _list[i].fileName,
                    status: 'done',
                    url : _list[i].accessAddress
                  });
            }
        }
        return newData;
    }

    //显示自身模态
    showModeHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            show: true
        });
    }
    //隐藏自身模态
    hideModelHandler = () => {
        this.setState({
            show: false
        });
    }
    viewFileHandler = () => {
        this.setState({
            show: true
        });
    }
    render() {
        return (
            <span className="ac-upload-wrap">
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="ac-upload-modal"
                    backdrop={false}
                    autoFocus={false}
                    enforceFocus={false}
                    show={this.state.show}
                    onHide={this.hideModelHandler} >
                    <Modal.Header
                        closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="ac-upload-wrap">
                            {!this.state.isView && <Upload {...this.uploadProps}>
                                <div className="opeat">
                                    <div className="svg-ready"></div>
                                    <div className="upload-tips">点击选择上传文件</div>
                                </div>
                            </Upload>}
                        </div>
                    </Modal.Body>
                </Modal>
            </span>
        );
    }
}


AcUpload.propTypes = propTypes;
AcUpload.defaultProps = {
    title: "文件上传",
    multiple: false,
    action: "/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload",
    showUploadList: true,
    accept: "",
    name: "files[]",
    data: {},
    maxSize: 10240000000,
    defaultFileList: []
}
export default AcUpload;
