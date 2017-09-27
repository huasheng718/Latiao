import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';

import { PullList, } from 'react-native-pull';

import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';

import Modal from 'react-native-modal'

var REQUEST_URL = 'http://latiao.izanpin.com/api/article/recommend?' + Math.random();


export default class home extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '辣条',
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'#000000'}
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        this.renderMovie = this.renderMovie.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);

    }

    _showModal = () => this.setState({ isModalVisible: true });
    _hideModal = () => this.setState({ isModalVisible: false });
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );


    componentDidMount() {
        this.fetchData();
    }

    fetchData(resolve) {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.result),
                    loaded: true,
                });
                if (typeof resolve === 'function') {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }
            })
            .done();

    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = { position: 'absolute', left: -10000 };
        const show = { position: 'relative', left: 0 };
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: show });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: show });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: show });
            }
        }, 1);
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => { this.txtPulling = c; }}>亲，下拉可以刷新数据</Text>
                <Text ref={(c) => { this.txtPullok = c; }}>松开立即刷新数据哦。</Text>
                <Text ref={(c) => { this.txtPullrelease = c; }}>数据加载中...</Text>
            </View>
        );
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
          <ScrollableTabView  renderTabBar={() => <ScrollableTabBar />}
          >
            <View  tabLabel='Tab #1' style={styles.pullingcent} >
                <PullList
                    onPullRelease={(resolve) => { this.fetchData(resolve) }}
                    topIndicatorRender={this.topIndicatorRender}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    pageSize={3}
                    initialListSize={1}
                    scrollRenderAheadDistance ={200}
                    onEndReached={() => { this.loadMore() }}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                    style={styles.listView}

                />
                <Modal isVisible={this.state.isModalVisible}
                    animationIn={'slideInRight'}
                    animationInTiming={0}
                    animationOut={'slideOutRight'}
                    animationOutTiming={0}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    >

                    <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                        {this._renderButton('Close', () => this.setState({ isModalVisible: false }))}
                    </View>
                </Modal>
            </View>
            <View tabLabel='Tab #2'><Text>favorite</Text></View>
            <View tabLabel='Tab #3'><Text>project</Text></View>
          </ScrollableTabView>

        );
    }


    renderLoadingView() {
        return (<View style={styles.container} >
            <ActivityIndicator />
            <Text>精彩内容准备中......</Text>
        </View>

        );
    }
    renderMovie(result) {
        return (
            <View style={styles.rightContainer}>

                <View style={styles.header}>
                    <Image source={{ uri: result.authorAvatar }} style={styles.authorAvatar} />
                    <Text style={styles.title}>{result.authorName}</Text>
                    <Text style={styles.year}>{result.createTime}</Text>
                </View>

                <Text style={styles.content}>{result.content}</Text>
                <TouchableOpacity activeOpacity ={1} onPress={this._showModal}>
                    {result.images.map((image) => (
                        <Image
                            key={image.id}
                            source={{ uri: image.thumbnailUrl }}
                            indicator={ProgressPie}
                            indicatorProps={{
                                size: 50,
                                borderWidth: 0,
                                color: 'rgba(254, 104, 106, 0.4)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                            style={styles.thumbnail}
                        />
                    ))}
                </TouchableOpacity >

            </View>

        );
    }

    renderFooter() {
        if (this.state.nomore) {
            return null;
        }
        return (
            <View style={{ height: 100 }}>
                <ActivityIndicator />
            </View>
        );
    }

    loadMore() {
        var aa = this.state.dataSource._dataBlob.s1;
        //alert(JSON.stringify(this.state.dataSource));
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                //alert(JSON.stringify(aa));
                responseData.result.forEach(function (element) {
                    aa.push(element);
                }, this);
            })
            .done();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(aa),
            });
        }, 1000);
    }


};


var styles = StyleSheet.create({
    pullingcent:{
        flex:1,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 5,
    },
    authorAvatar: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc'
    },
    rightContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 15,
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 0.5,
        },
        shadowColor: '#000',
        shadowOpacity: 0.5,

        paddingBottom: 10,
    },
    title: {
        fontSize: 12,
        color: '#bf5555',
        textAlign: 'left',
        marginRight: 10,
    },
    content: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 5,
        paddingLeft: 5,
    },
    year: {
        fontSize: 12,
        textAlign: 'left',
    },
    thumbnail: {
        height: 230,
        //resizeMode: Image.resizeMode.cover,
    },
    listView: {
        backgroundColor: '#F5F5F5',
    },
});
