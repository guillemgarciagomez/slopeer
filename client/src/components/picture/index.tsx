import { profilePicturesUrl, routePicturesUrl } from '../../config'
import { selectPlaceholder } from '../../utils/routes';
import { h, FunctionComponent } from 'preact';

type PictureProps = {
  profile: boolean;
  picture: string;
  username?: string;
  type: string;
  routename: string;
  pictureStyle: any;
  imageStyle: any;
}

const Picture: FunctionComponent<PictureProps> = ({ profile, picture, username, type, routename, pictureStyle, imageStyle }) => {
  const baseUrl = profile ? profilePicturesUrl : routePicturesUrl
  let defaultUrl
  let webpUrl

  if (picture) {
    webpUrl = baseUrl + picture.split('.')[0] + '.webp'
    defaultUrl = baseUrl + picture
  } else {
    defaultUrl = profile
      ? '/assets/images/avatar.svg'
      : selectPlaceholder(type)
  }

  return (
    <picture class={pictureStyle} >
      {
        picture ? <source type='image/webp' srcset={webpUrl} /> : null
      }
      <source srcset={defaultUrl} />
      {
        profile
          ? <img src={defaultUrl} alt={`${username} profile_picture`} class={imageStyle} />
          : <img src={defaultUrl} alt={`${routename} picture`} class={imageStyle} />
      }
    </picture>
  )
}

export default Picture
