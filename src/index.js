/**
 * 上传组件
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
    data: PropTypes.object,
    isView: PropTypes.bool
};

class AcUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            historyData: props.defaultFileList
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.setState({
            historyData: newProps.defaultFileList
        });
    }
    defaultFileListToList = (_list) => {
        let newData = [];
        if (Array.isArray(_list)) {
            for (let i = 0; i < _list.length; i++) {
                if (_list[i]['del'] == null) {
                    newData.push({
                        uid: _list[i].fileName,
                        name: _list[i].originalFileName,
                        status: 'done',
                        url: _list[i].accessAddress
                    });
                }
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
        const uploadProps = {
            name: this.props.name,
            multiple: this.props.multiple,
            showUploadList: this.props.showUploadList,
            action: this.props.action,
            accept: this.props.accept,
            defaultFileList: this.defaultFileListToList(this.state.historyData),
            onChange: (msg) => {
                if (msg.file.status == 'done') {
                    this.props.onSuccess && this.props.onSuccess(msg.file.response);
                    if (!this.props.multiple) {
                        this.setState({
                            show: false
                        });
                    }
                }
                if (msg.file.status == 'error') {
                    this.props.onError && this.props.onError();
                }
                if (msg.file.status == 'uploading') {
                    console.log('uploading');
                }
                if (msg.file.status == 'removed') {
                    console.log(msg);
                    this.props.onDelete && this.props.onDelete(msg.file);
                }
            }
        };
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
                            <Upload {...uploadProps}>
                                {!this.props.isView && <div className="opeat">
                                    <div className="svg-ready"></div>
                                    <div className="upload-tips">点击选择上传文件</div>
                                </div>}
                            </Upload>
                            {(this.props.isView && this.props.defaultFileList.length == 0) && <div className="opeat">
                                <div className="svg-no-pic"></div>
                                <div style={{ "fontSize": "14px" }} className="upload-tips">暂无附件</div>
                            </div>}
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
    defaultFileList: [],
    isView: false
}
export default AcUpload;
