import React from 'react';
// @ts-ignore
import * as Animatable from 'react-native-animatable';
import { View, Image, Text } from 'react-native-web';

import { useAuthorize } from '../../hooks/useAuthorize';

function Dot () {
  return (
    <Animatable.View 
      animation="rotate"
      iterationCount="infinite"
      duration={2000}
      easing="linear"
      style={{
        position: 'absolute',
        height: '78px', 
        width: '78px',
        left: '0',
        top: '0',
        borderRadius: '80px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          height: '5px',
          width: '5px',
          borderRadius: '5px',
          background: 'green',
          marginLeft: '-2.5px'
        }}
      >

      </View>
    </Animatable.View>
  )
}

function Logo () {
  return <View 
    style={{ 
      display: 'flex', 
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 4, 
      width: '100%', 
    }}
  >
    <View 
      style={{ 
        position: 'relative',
        height: '80px', 
        width: '80px',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '80px',
        border: '1px solid #eee'
      }}
    >
      <Dot />
      <Image 
        style={{ height: '60px', width: '60px', position: 'relative' }} 
        source={{ uri: `@weixin/icon` }} 
      />
    </View>
  </View>
}

function QRCode ({ authorization, signInId }) {
  return <View 
    style={{ 
      flex: 6, 
      width: '100%',
      display: 'flex', 
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    {
      authorization ?
      <>
        <View 
          style={{ 
            height: '100px', 
            width: '100px', 
            marginTop: '10px', 
            position: 'relative',
          }}
        >
          <Image 
            style={{ height: '100px', width: '100px' }}
            source={{ uri: `@weixin/signIn/qrcode/${signInId}` }} 
          />
          {
            authorization.state === 'scanned' ? 
              <View
                style={{
                  height: '100px', 
                  width: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Text 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '14px',
                  }}
                >已扫码</Text>
              </View> : null
          }
        </View>
        <Text style={{ fontSize: '12px', color: '#999' }}>扫码授权登陆</Text>
      </> : null
    }
  </View>
}

function Loading ({ signInId, authorization }) {
  return (
    <View 
      style={{ 
        display: 'flex', 
        height: '812px', 
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo />
      <QRCode 
        signInId={signInId} 
        authorization={authorization} 
      />
   </View>
  )
}

export function Authorize (props) {
  const [id, authorization] = useAuthorize();

  return <View style={{ height: '100%', width: '100%' }}>
    {
      authorization && ((authorization as any).state === 'success') ?
        props.children :
        <Loading 
          signInId={id} 
          authorization={authorization} 
        />
    }
  </View>
}