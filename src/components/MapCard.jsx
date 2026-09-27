import { CONTACT } from '../data/content';

/** Google Maps embed of Paralox HQ with an address card and a Google Maps link. */
export default function MapCard() {
  return (
    <div className="map-card">
      <iframe className="map-art" src={CONTACT.mapEmbed} title={`Map showing ${CONTACT.company}`}
        loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      <div className="map-info">
        <div><span className="mono">Paralox HQ</span><b>{CONTACT.company}</b><span>{CONTACT.address}</span></div>
        <a className="btn btn-white btn-sm" href={CONTACT.mapUrl} target="_blank" rel="noopener">Open in Google Maps <span className="arr">↗</span></a>
      </div>
    </div>
  );
}
