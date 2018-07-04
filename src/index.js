/**
 * 手动上传组件
 */

import React, { Component } from 'react';
import { Modal, Button, Icon, Upload, Message, Loading, Table, Popconfirm, ProgressBar } from 'tinper-bee';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bytesToSize, getPercent, getFileTypeIcon } from './common';

const Dragger = Upload.Dragger;
const propTypes = {
    title: PropTypes.string,
    multiple: PropTypes.bool,
    action: PropTypes.string,
    showUploadList: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    maxSize: PropTypes.number,
    isShow: PropTypes.bool
};

class AcUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            uploading: false,
            isView: false,
            hisFileList: [],
            fileList: [],
            filePercent: 0
        }
        this.uploadProps = {
            name: 'file',
            multiple: props.multiple,
            showUploadList: props.showUploadList,
            action: props.action,
            accept: props.accept,
            beforeUpload: (file) => {
                console.log(file);
                if (file.size > this.props.maxSize) {
                    Message.create({ content: '文件大小超过默认值', color: 'warning' });
                    return false;
                }
                if (this.state.fileList.find(((item) => (item.name == file.name)))) {
                    Message.create({ content: '重复选择文件', color: 'warning' });
                } else {
                    this.setState(({ fileList }) => ({
                        fileList: [...fileList, file],
                    }));
                }
                return false;
            }
        };

    }
    hisFileColumns = () => {
        let self = this;
        return [{
            title: "序号",
            dataIndex: "fileName",
            width: 25,
            render(text, record, index) {
                return index + 1;
            }
        }, {
            title: "文件名",
            dataIndex: "fileName",
            width: 265,
            render(text, record, index) {
                return <span className="table-link"><a target="_blank" href={record.accessAddress}>{record.fileName}</a></span>
            }
        }, {
            title: "操作",
            dataIndex: "fileName",
            width: 25,
            render(text, record, index) {
                return (<span className="table-link">
                    <a onClick={self.handlerTableRemove(record, index)} href="javascript:;">删除</a>
                </span>)
            }
        }]
    }
    //获得加载dom
    getElement = () => {
        return document.querySelector('.ac-upload-modal')
    }
    //删除上传文件
    onRemove = (file) => () => {
        if (this.state.filePercent > 0) {

        } else {
            this.setState(({ fileList }) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
            });
        }
    }
    //历史上传后的删除事件
    handlerTableRemove = (record, index) => () => {
        this.setState(({ hisFileList }) => {
            const index = hisFileList.indexOf(record);
            const newFileList = hisFileList.slice();
            newFileList.splice(index, 1);
            this.props.onSuccess && this.props.onSuccess(newFileList);
            return {
                hisFileList: newFileList,
            };
        });
    }
    //显示自身模态
    showModeHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            show: true,
            isView: false,
            filePercent: 0
        });
    }
    //隐藏自身模态
    hideModelHandler = () => {
        if (this.state.filePercent > 0) {

        } else {
            this.setState({
                show: false,
                fileList: [],
                filePercent: 0
            });
        }

    }
    //打开模态触发
    onEnter = () => {

    }
    //开始上传
    startUploadClick = async () => {
        this.setState({
            uploading: true
        });
        const { fileList } = this.state;
        const formData = new FormData();
        const data = this.props.data;
        fileList.forEach((file) => {
            formData.append(this.props.name, file);
        });
        for (let key in data) {
            formData.append(key, data[key]);
        }
        // let result = await axios.post(this.props.action, formData).catch(err => {
        //     this.setState({
        //         uploading: false
        //     });
        //     this.props.onError && this.props.onError(err);
        // });
        let result = await axios({
            url: this.props.action,
            method: 'post',
            data: formData,
            timeout: 50000,
            onUploadProgress: (progressEvent) => {
                this.setState({
                    filePercent: getPercent(progressEvent.loaded, progressEvent.total)
                });
            }
        }).catch(err => {
            this.setState({
                uploading: false
            });
            this.props.onError && this.props.onError(err);
        });
        if (result) {
            this.setState(({ hisFileList }) => {
                let newFileList = hisFileList.slice();
                newFileList = newFileList.concat(result.data.data);
                return {
                    uploading: false,
                    hisFileList: newFileList,
                    filePercent: 0
                }
            });
            // this.setState({

            //     hisFileList: result.data.data
            // });
            if (result && result.data.status == 1) {
                this.props.onSuccess && this.props.onSuccess(result.data.data);
                this.setState({
                    show: false,
                    fileList: []
                });
            }
        } else {
            this.setState({
                filePercent: 0
            });
        }

    }
    viewFileHandler = () => {
        this.setState({
            isView: true,
            show: true
        });
    }
    render() {
        return (
            <span className="ac-upload-wrap">
                <Loading container={this.getElement} loadingType="line" />
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                {(this.state.hisFileList.length > 0 && this.props.isShow) && <Button onClick={this.viewFileHandler} style={{ "marginLeft": "10px" }} colors="info" >查看</Button>}
                <Modal
                    dialogClassName="ac-upload-modal"
                    backdrop={false}
                    autoFocus={false}
                    enforceFocus={false}
                    onEnter={this.onEnter}
                    show={this.state.show}
                    onHide={this.hideModelHandler} >
                    <Modal.Header
                        closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="ac-upload-wrap">
                            {!this.state.isView && <Dragger {...this.uploadProps}>
                                <div className="opeat">
                                    {/* <Icon type="inbox" className="uf-upload icon-upload" /> */}
                                    <div className="svg-ready"></div>
                                    <div className="upload-tips">拖拽文件到此处或</div>
                                    <div className="upload-tips">点击选择上传文件</div>
                                </div>
                            </Dragger>}
                            {!this.state.isView && <div className="file-progress">
                                <ProgressBar size="sm" now={this.state.filePercent} />
                            </div>}
                            <div className="file-list">
                                {!this.state.isView && <ul className="file-list-item">
                                    {
                                        this.state.fileList.map((file, index) => (
                                            <li className="file-item-onec" key={index}><span className={getFileTypeIcon(file.name)}></span> <span className="file-name">{file.name}</span><Icon onClick={this.onRemove(file)} className="file-close" type="uf-close-bold" title={`删除${file.name}`} /></li>
                                        ))
                                    }
                                </ul>}
                                {this.state.isView && <ul className="file-list-item">
                                    <Table
                                        columns={this.hisFileColumns()}
                                        data={this.state.hisFileList}
                                        bordered
                                        scroll={{ y: 230 }}
                                        emptyText={() => <span>暂无附件</span>}
                                    >
                                    </Table>
                                    {/* {
                                        this.state.hisFileList.map((file, index) => (
                                            <li className="clearfix" key={index}><a target="_blank" href={file.accessAddress}> 名称:「{file.fileName}」 </a> </li>
                                        ))
                                    } */}
                                </ul>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.state.isView && <Button onClick={this.startUploadClick} disabled={(this.state.fileList.length != 0 && this.state.filePercent == 0) ? false : true} colors="primary" > 开始上传 </Button>}
                    </Modal.Footer>
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
    isShow: true
}
export default AcUpload;
