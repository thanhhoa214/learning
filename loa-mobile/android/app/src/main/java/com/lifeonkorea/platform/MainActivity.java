package com.abc.platform;

import android.content.Intent;
import android.os.Bundle;
import co.boundstate.BranchDeepLinks;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.rin.zaloauth.ZaloAuthCapacitorPlugin;
import com.zing.zalo.zalosdk.oauth.ZaloSDK;
import java.util.ArrayList;

import android.content.Context;
import androidx.multidex.MultiDex;
import io.branch.referral.Branch;
import co.fitcom.capacitor.Downloader.DownloaderPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void

  onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Branch.enableLogging();

    // Branch object initialization
    Branch.getAutoInstance(this.getApplicationContext(),"key_live_bm8oBjXeAxAfU348ItUG4glgAtbgvIbX");
    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      add(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
      add(ZaloAuthCapacitorPlugin.class);
      add(BranchDeepLinks.class);
      add(DownloaderPlugin.class); 
    }

});
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
     ZaloSDK.Instance.onActivityResult(this, requestCode, resultCode, data);
  }
  @Override
  protected void onNewIntent(Intent intent) {
    this.setIntent(intent);
    super.onNewIntent(intent);
  }
  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
