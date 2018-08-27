import React from 'react';
import { AdMobBanner } from 'expo';

import ENV from '../../env.json';

const BANNER_ID = ENV.ADMOB_BANNER_ID;

class AdTile extends React.Component {
  render() {
    const {
      show,
    } = this.props;

    if (!show) { return null; }

    return (
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={BANNER_ID}
        didFailToReceiveAdWithError={this.bannerError}
      />
    );
  }
}

export default AdTile;
