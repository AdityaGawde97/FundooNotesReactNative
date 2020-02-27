package com.fundoonotes;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// import android.location.LocationManager;
// import android.location.LocationListener;
// import android.location.Location;
// import com.fundoonotes.service.LocationService;
// import android.content.Context;
// import android.os.Bundle;
// import android.content.Intent;
// import com.facebook.react.HeadlessJsTaskService;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new VectorIconsPackage());
      packages.add(new CustomToastPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  // private final LocationListener listener = new LocationListener() {
  //   @Override
  //   public void onStatusChanged(String provider, int status, Bundle extras) {
  //   }

  //   @Override
  //   public void onProviderEnabled(String provider) {
  //   }

  //   @Override
  //   public void onProviderDisabled(String provider) {
  //   }

  //   @Override
  //   public void onLocationChanged(Location location) {
  //     Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
  //     getApplicationContext().startService(myIntent);
  //     HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
  //   }
  // };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
    // // Start requesting for location
    // locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
