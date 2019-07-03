/**
 * Ac上传组件
 */

import React, { Component } from 'react';
import { Modal, Button, Icon, Upload, Message, Loading, Table, Popconfirm, ProgressBar } from 'tinper-bee';
import PropTypes from 'prop-types';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_CN.js';
import en_US from './locale/en_US.js';
import zh_TW from './locale/zh_TW.js'; 
import {IntlProvider,addLocaleData,FormattedMessage} from 'react-intl';
import cookie from 'react-cookies';

//加载国际化文件
addLocaleData([...en,...zh]);

let messages = {};
messages['en'] = en_US;
messages['en-US'] = en_US;
messages['en_US'] = en_US;
messages['zh'] = zh_CN;
messages['zh-CN'] = zh_CN;
messages['zh_CN'] = zh_CN;
messages['zh-TW'] = zh_TW;
messages['zh_TW'] = zh_TW;

let localeMap = {
    'en-US': 'en',
    'en_US': 'en',
    'zh-CN': 'zh',
    'zh_CN': 'zh',
    'zh-TW': 'zh',
    'zh_TW': 'zh'
}

const propTypes = {
    title: PropTypes.string,
    uploadTip: PropTypes.string,
    multiple: PropTypes.bool,
    action: PropTypes.string,
    showUploadList: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object,
    maxSize: PropTypes.number,
    isView: PropTypes.bool,
    beforeUpload: PropTypes.func
};

const defaultProps = {
    title: "文件上传",
    multiple: false,
    action: "/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload",
    showUploadList: true,
    accept: "",
    name: "files[]",
    data: {},
    maxSize: 10240000000,
    defaultFileList: [],
    isView: false,
}

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
                        id: _list[i].id || "",
                        uid: _list[i].fileName || "",
                        name: _list[i].fileName || "",
                        status: 'done',
                        url: _list[i].accessAddress || ""
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
            data: this.props.data,
            size: this.props.maxSize,
            multiple: this.props.multiple,
            showUploadList: this.props.showUploadList,
            action: this.props.action,
            accept: this.props.accept,
            defaultFileList: this.defaultFileListToList(this.state.historyData),
            beforeUpload: this.props.beforeUpload,
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

                }
                if (msg.file.status == 'removed') {
                    this.props.onDelete && this.props.onDelete(msg.file);
                }
            }
        }
        let localeSrc = this.props.locale || cookie.load('u_locale') || 'zh'; 
        let locale = localeMap[localeSrc] || localeSrc;

        return (
            <IntlProvider locale={locale} messages={messages[localeSrc]}>
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
                            <Modal.Title><FormattedMessage id="intl.title" defaultMessage={this.props.title} /></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="ac-upload-wrap">
                                <Upload {...uploadProps}>
                                    {!this.props.isView && <div className="opeat">
                                        <div className="svg-ready"></div>
                                        <div className="upload-tips">{this.props.uploadTip || <FormattedMessage id="intl.msg.upload" />}</div>
                                    </div>}
                                </Upload>
                                {(this.props.isView && this.props.defaultFileList.length == 0) && <div className="opeat">
                                    <div className="svg-no-pic"></div>
                                    <div style={{ "fontSize": "14px" }} className="upload-tips"><FormattedMessage id="intl.msg.empty" /></div>
                                </div>}
                            </div>
                        </Modal.Body>
                    </Modal>
                </span>
            </IntlProvider>
        );
    }
}


AcUpload.propTypes = propTypes;
AcUpload.defaultProps = defaultProps;

export default AcUpload;
