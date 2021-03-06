
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { inject, observer } from 'mobx-react/native';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';

import FadeImage from '../../../components/FadeImage';

@inject(stores => ({
    isLogin: stores.session.isLogin,
    playing: stores.player.playing,
    paused: stores.player.paused,
    song: stores.player.song,
}))
@observer
export default class Footer extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    highlight(props = this.props) {
        var { navigation } = props;
        var { index, routes } = navigation.state;
        var current = routes[index];
        var name = current.key;
        var ele = this.refs[name];

        if (ele) {
            ele.setNativeProps({
                style: {
                    color: 'red'
                }
            });

            for (var key in this.refs) {
                if (key !== name) {
                    this.refs[key].setNativeProps({

                        style: {
                            color: '#000'
                        }
                    });
                }
            }
        }
    }

    componentDidMount = () => this.highlight();

    componentWillReceiveProps(nextProps) {
        this.highlight(nextProps);
    }

    caninavigate(routeName) {
        var { navigate, state } = this.props.navigation;
        var current = state.routes[state.index];

        if (routeName !== current.routeName) {
            navigate(routeName);
        }
    }

    render() {
        var { playing, paused, song } = this.props;

        return (
            <Animated.View style={[styles.container, this.props.style]}>

                <TouchableOpacity style={styles.item} onPress={e => {
                    this.caninavigate('Home');
                }}>
                    <Icon name="playlist" ref="Home" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={e => {
                    this.caninavigate('Charts');
                }}>
                    <Icon name="magnifier" ref="Charts" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={e => {
                    if (this.props.isLogin()) {
                        this.caninavigate('Profile');
                    } else {
                        this.caninavigate('Login');
                    }
                }}>
                    <Icon name="heart" ref="Profile" size={20} />
                </TouchableOpacity>

                {
                    playing && (
                        <TouchableOpacity style={styles.item} onPress={e => {
                            this.caninavigate('Player');
                        }}>
                            <FadeImage {...{
                                source: {
                                    uri: song.artwork,
                                },

                                resizeMode: 'cover',
                                style: {
                                    height: 30,
                                    width: 30,
                                    shadowColor: '#000',
                                    shadowOpacity: .6,
                                    shadowRadius: 8,
                                    shadowOffset: {
                                        height: 8,
                                        width: -2
                                    },
                                },
                            }}>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: 'rgba(0,0,0,.7)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {
                                        !paused
                                            ? <Icon name="control-pause" size={10} color="white" />
                                            : <Icon name="control-play" size={10} color="white" />
                                    }
                                </View>
                            </FadeImage>
                        </TouchableOpacity>
                    )
                }
            </Animated.View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        width,
        height: 50,
        borderTopWidth: .5,
        borderTopColor: '#000',
        backgroundColor: 'rgba(255,255,255,.6)',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        opacity: .7,
    },

    item: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    playing: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 50,
        height: 50,
    }
});
