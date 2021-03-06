
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import List from './List';

@inject(stores => ({
    list: stores.profile.liked,
    doRefresh: () => stores.profile.getLiked(stores.session.user.id),
    loading4refresh: stores.profile.loading,
    doLoadMore: stores.profile.loadMoreLiked,
    loading4loadmore: stores.profile.loading4liked,
}))
@observer
export default class LikedPlaylist extends Component {
    render() {
        return (
            <List {...{
                title: 'LIKED PLAYED',
                navigate: this.props.navigation.navigate,
                ...this.props,
            }} />
        );
    }
}
