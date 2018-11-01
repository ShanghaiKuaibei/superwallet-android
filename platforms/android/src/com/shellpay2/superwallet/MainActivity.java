/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.shellpay2.superwallet;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

// Integrate bugsnag
import com.bugsnag.android.Bugsnag;

public class MainActivity extends CordovaActivity
{

    private static Activity m_instance = null;


    public static Activity getM_instance() {
        return m_instance;
    }

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        m_instance = this;
      // integrate bugsnag
      Bugsnag.init(this);
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
      // Test integration with bugsnag
        Bugsnag.notify(new RuntimeException("Non-fatal"));
    }
}
