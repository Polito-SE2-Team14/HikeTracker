let gpxParser = require("gpxparser");

export function getTestData() {
   var gpx = new gpxParser();
	gpx.parse(data);

   // hike.hikeID, hike.title, hike.length, hike.Ascent, hike.Difficulty
   let points = gpx.tracks[0].points.map((p) => {
      return {
         name: p.name,
         latitude: p.lat,
         longitude: p.lon
      }
   });

   return [{
      hikeID: "1",
      title: "Rocciamelone vero",
      length: gpx.tracks[0].distance.total,
      ascent: gpx.tracks[0].elevation.pos,
      difficulty: "Hiker",
      expectedTime: "90"
   }, points];
}

function calculateExpectedTime(hike){
   //TODO(antonio): from GPX tracks calculate average time

   // time(min) = (12.09 * distance(m) + 98.4 *elevation(m))/1000
}

const data = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="Maps 3D" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
	<trk>
<name>rocciamelone vero</name>
<extensions>
<Maps3D:TrackExtensions xmlns:Maps3D="http://www.movingworld.de/xmlschemas/GpxExtensions/v1">
<Maps3D:RealSpeed>1.018955</Maps3D:RealSpeed>
<Maps3D:RealSecondsSpent>16237</Maps3D:RealSecondsSpent>
</Maps3D:TrackExtensions>
</extensions>
<trkseg>
<trkpt lat="45.177786" lon="7.083372">
   <ele>2147.107666</ele>
   <time>2021-07-02T07:18:42Z</time>
</trkpt>
<trkpt lat="45.177913" lon="7.083268">
   <ele>2148.453125</ele>
   <time>2021-07-02T07:18:58Z</time>
</trkpt>
<trkpt lat="45.178044" lon="7.083159">
   <ele>2149.821045</ele>
   <time>2021-07-02T07:19:14Z</time>
</trkpt>
<trkpt lat="45.178199" lon="7.083081">
   <ele>2151.275391</ele>
   <time>2021-07-02T07:19:29Z</time>
</trkpt>
<trkpt lat="45.178361" lon="7.083018">
   <ele>2152.938965</ele>
   <time>2021-07-02T07:19:45Z</time>
</trkpt>
<trkpt lat="45.178477" lon="7.082895">
   <ele>2156.169922</ele>
   <time>2021-07-02T07:20:01Z</time>
</trkpt>
<trkpt lat="45.178591" lon="7.082727">
   <ele>2160.919434</ele>
   <time>2021-07-02T07:20:16Z</time>
</trkpt>
<trkpt lat="45.178753" lon="7.082619">
   <ele>2164.498047</ele>
   <time>2021-07-02T07:20:31Z</time>
</trkpt>
<trkpt lat="45.178900" lon="7.082514">
   <ele>2168.287842</ele>
   <time>2021-07-02T07:20:47Z</time>
</trkpt>
<trkpt lat="45.179071" lon="7.082438">
   <ele>2170.920166</ele>
   <time>2021-07-02T07:21:03Z</time>
</trkpt>
<trkpt lat="45.179219" lon="7.082347">
   <ele>2173.801025</ele>
   <time>2021-07-02T07:21:19Z</time>
</trkpt>
<trkpt lat="45.179408" lon="7.082283">
   <ele>2176.026367</ele>
   <time>2021-07-02T07:21:34Z</time>
</trkpt>
<trkpt lat="45.179555" lon="7.082232">
   <ele>2178.082275</ele>
   <time>2021-07-02T07:21:50Z</time>
</trkpt>
<trkpt lat="45.179709" lon="7.082178">
   <ele>2180.494141</ele>
   <time>2021-07-02T07:22:06Z</time>
</trkpt>
<trkpt lat="45.179880" lon="7.082138">
   <ele>2182.772705</ele>
   <time>2021-07-02T07:22:22Z</time>
</trkpt>
<trkpt lat="45.180032" lon="7.082123">
   <ele>2184.073730</ele>
   <time>2021-07-02T07:22:38Z</time>
</trkpt>
<trkpt lat="45.179965" lon="7.081954">
   <ele>2190.000488</ele>
   <time>2021-07-02T07:23:02Z</time>
</trkpt>
<trkpt lat="45.179794" lon="7.081847">
   <ele>2192.147949</ele>
   <time>2021-07-02T07:23:17Z</time>
</trkpt>
<trkpt lat="45.179613" lon="7.081837">
   <ele>2190.602539</ele>
   <time>2021-07-02T07:23:33Z</time>
</trkpt>
<trkpt lat="45.179442" lon="7.081813">
   <ele>2189.483398</ele>
   <time>2021-07-02T07:23:48Z</time>
</trkpt>
<trkpt lat="45.179302" lon="7.081776">
   <ele>2188.937988</ele>
   <time>2021-07-02T07:24:05Z</time>
</trkpt>
<trkpt lat="45.179147" lon="7.081767">
   <ele>2187.243652</ele>
   <time>2021-07-02T07:24:20Z</time>
</trkpt>
<trkpt lat="45.178983" lon="7.081805">
   <ele>2183.597656</ele>
   <time>2021-07-02T07:24:35Z</time>
</trkpt>
<trkpt lat="45.178973" lon="7.081613">
   <ele>2186.152588</ele>
   <time>2021-07-02T07:25:38Z</time>
</trkpt>
<trkpt lat="45.179072" lon="7.081462">
   <ele>2188.206543</ele>
   <time>2021-07-02T07:26:07Z</time>
</trkpt>
<trkpt lat="45.179168" lon="7.081302">
   <ele>2190.894775</ele>
   <time>2021-07-02T07:26:28Z</time>
</trkpt>
<trkpt lat="45.179274" lon="7.081145">
   <ele>2193.954102</ele>
   <time>2021-07-02T07:26:43Z</time>
</trkpt>
<trkpt lat="45.179379" lon="7.081016">
   <ele>2197.547852</ele>
   <time>2021-07-02T07:27:13Z</time>
</trkpt>
<trkpt lat="45.179503" lon="7.080876">
   <ele>2202.471680</ele>
   <time>2021-07-02T07:27:28Z</time>
</trkpt>
<trkpt lat="45.179620" lon="7.080775">
   <ele>2205.513672</ele>
   <time>2021-07-02T07:28:04Z</time>
</trkpt>
<trkpt lat="45.179767" lon="7.080731">
   <ele>2209.812988</ele>
   <time>2021-07-02T07:28:20Z</time>
</trkpt>
<trkpt lat="45.179905" lon="7.080712">
   <ele>2214.438965</ele>
   <time>2021-07-02T07:28:44Z</time>
</trkpt>
<trkpt lat="45.179993" lon="7.080565">
   <ele>2216.156738</ele>
   <time>2021-07-02T07:29:07Z</time>
</trkpt>
<trkpt lat="45.180110" lon="7.080454">
   <ele>2217.326660</ele>
   <time>2021-07-02T07:29:28Z</time>
</trkpt>
<trkpt lat="45.180232" lon="7.080372">
   <ele>2219.381348</ele>
   <time>2021-07-02T07:29:51Z</time>
</trkpt>
<trkpt lat="45.180365" lon="7.080340">
   <ele>2222.248291</ele>
   <time>2021-07-02T07:30:13Z</time>
</trkpt>
<trkpt lat="45.180497" lon="7.080269">
   <ele>2225.654785</ele>
   <time>2021-07-02T07:30:43Z</time>
</trkpt>
<trkpt lat="45.180521" lon="7.080063">
   <ele>2227.975586</ele>
   <time>2021-07-02T07:31:32Z</time>
</trkpt>
<trkpt lat="45.180643" lon="7.079972">
   <ele>2232.438721</ele>
   <time>2021-07-02T07:31:51Z</time>
</trkpt>
<trkpt lat="45.180735" lon="7.079806">
   <ele>2235.039062</ele>
   <time>2021-07-02T07:32:24Z</time>
</trkpt>
<trkpt lat="45.180816" lon="7.079643">
   <ele>2237.834961</ele>
   <time>2021-07-02T07:32:44Z</time>
</trkpt>
<trkpt lat="45.180923" lon="7.079512">
   <ele>2241.613281</ele>
   <time>2021-07-02T07:33:08Z</time>
</trkpt>
<trkpt lat="45.181020" lon="7.079377">
   <ele>2245.341309</ele>
   <time>2021-07-02T07:33:30Z</time>
</trkpt>
<trkpt lat="45.181114" lon="7.079234">
   <ele>2249.530518</ele>
   <time>2021-07-02T07:33:52Z</time>
</trkpt>
<trkpt lat="45.181242" lon="7.079153">
   <ele>2255.008789</ele>
   <time>2021-07-02T07:34:15Z</time>
</trkpt>
<trkpt lat="45.181377" lon="7.079153">
   <ele>2260.682129</ele>
   <time>2021-07-02T07:34:35Z</time>
</trkpt>
<trkpt lat="45.181513" lon="7.079161">
   <ele>2266.469971</ele>
   <time>2021-07-02T07:35:46Z</time>
</trkpt>
<trkpt lat="45.181642" lon="7.079087">
   <ele>2271.167480</ele>
   <time>2021-07-02T07:36:06Z</time>
</trkpt>
<trkpt lat="45.181729" lon="7.078928">
   <ele>2272.930664</ele>
   <time>2021-07-02T07:36:23Z</time>
</trkpt>
<trkpt lat="45.181823" lon="7.078789">
   <ele>2275.189941</ele>
   <time>2021-07-02T07:37:33Z</time>
</trkpt>
<trkpt lat="45.181950" lon="7.078664">
   <ele>2279.204590</ele>
   <time>2021-07-02T07:37:49Z</time>
</trkpt>
<trkpt lat="45.182043" lon="7.078520">
   <ele>2282.126221</ele>
   <time>2021-07-02T07:38:14Z</time>
</trkpt>
<trkpt lat="45.182174" lon="7.078446">
   <ele>2287.275879</ele>
   <time>2021-07-02T07:38:39Z</time>
</trkpt>
<trkpt lat="45.182314" lon="7.078399">
   <ele>2293.045654</ele>
   <time>2021-07-02T07:39:06Z</time>
</trkpt>
<trkpt lat="45.182428" lon="7.078282">
   <ele>2297.224121</ele>
   <time>2021-07-02T07:39:28Z</time>
</trkpt>
<trkpt lat="45.182498" lon="7.078118">
   <ele>2298.344238</ele>
   <time>2021-07-02T07:39:50Z</time>
</trkpt>
<trkpt lat="45.182637" lon="7.078194">
   <ele>2306.323975</ele>
   <time>2021-07-02T07:40:18Z</time>
</trkpt>
<trkpt lat="45.182706" lon="7.078022">
   <ele>2308.316895</ele>
   <time>2021-07-02T07:42:41Z</time>
</trkpt>
<trkpt lat="45.182797" lon="7.077876">
   <ele>2312.097900</ele>
   <time>2021-07-02T07:43:07Z</time>
</trkpt>
<trkpt lat="45.182932" lon="7.077827">
   <ele>2319.319580</ele>
   <time>2021-07-02T07:43:31Z</time>
</trkpt>
<trkpt lat="45.182968" lon="7.078025">
   <ele>2322.388184</ele>
   <time>2021-07-02T07:43:56Z</time>
</trkpt>
<trkpt lat="45.183052" lon="7.078189">
   <ele>2327.563477</ele>
   <time>2021-07-02T07:44:22Z</time>
</trkpt>
<trkpt lat="45.183144" lon="7.078330">
   <ele>2332.656738</ele>
   <time>2021-07-02T07:44:46Z</time>
</trkpt>
<trkpt lat="45.183251" lon="7.078447">
   <ele>2336.434570</ele>
   <time>2021-07-02T07:45:20Z</time>
</trkpt>
<trkpt lat="45.183322" lon="7.078284">
   <ele>2341.456299</ele>
   <time>2021-07-02T07:45:46Z</time>
</trkpt>
<trkpt lat="45.183375" lon="7.078098">
   <ele>2344.179199</ele>
   <time>2021-07-02T07:46:12Z</time>
</trkpt>
<trkpt lat="45.183451" lon="7.077939">
   <ele>2348.071289</ele>
   <time>2021-07-02T07:48:38Z</time>
</trkpt>
<trkpt lat="45.183530" lon="7.078105">
   <ele>2352.248047</ele>
   <time>2021-07-02T07:49:10Z</time>
</trkpt>
<trkpt lat="45.183628" lon="7.078248">
   <ele>2357.477051</ele>
   <time>2021-07-02T07:49:38Z</time>
</trkpt>
<trkpt lat="45.183728" lon="7.078386">
   <ele>2362.020508</ele>
   <time>2021-07-02T07:50:00Z</time>
</trkpt>
<trkpt lat="45.183833" lon="7.078506">
   <ele>2365.554932</ele>
   <time>2021-07-02T07:50:27Z</time>
</trkpt>
<trkpt lat="45.183951" lon="7.078624">
   <ele>2369.674805</ele>
   <time>2021-07-02T07:50:56Z</time>
</trkpt>
<trkpt lat="45.184068" lon="7.078728">
   <ele>2373.856445</ele>
   <time>2021-07-02T07:51:24Z</time>
</trkpt>
<trkpt lat="45.184202" lon="7.078783">
   <ele>2379.920166</ele>
   <time>2021-07-02T07:52:57Z</time>
</trkpt>
<trkpt lat="45.184339" lon="7.078848">
   <ele>2386.516113</ele>
   <time>2021-07-02T07:53:41Z</time>
</trkpt>
<trkpt lat="45.184438" lon="7.078983">
   <ele>2389.811035</ele>
   <time>2021-07-02T07:54:04Z</time>
</trkpt>
<trkpt lat="45.184553" lon="7.079116">
   <ele>2394.088867</ele>
   <time>2021-07-02T07:54:24Z</time>
</trkpt>
<trkpt lat="45.184664" lon="7.079234">
   <ele>2398.258301</ele>
   <time>2021-07-02T07:54:46Z</time>
</trkpt>
<trkpt lat="45.184772" lon="7.079350">
   <ele>2402.178955</ele>
   <time>2021-07-02T07:56:50Z</time>
</trkpt>
<trkpt lat="45.184888" lon="7.079466">
   <ele>2406.641602</ele>
   <time>2021-07-02T07:57:47Z</time>
</trkpt>
<trkpt lat="45.184997" lon="7.079585">
   <ele>2410.774658</ele>
   <time>2021-07-02T07:58:10Z</time>
</trkpt>
<trkpt lat="45.185116" lon="7.079694">
   <ele>2415.023682</ele>
   <time>2021-07-02T07:59:16Z</time>
</trkpt>
<trkpt lat="45.185227" lon="7.079831">
   <ele>2418.272461</ele>
   <time>2021-07-02T07:59:31Z</time>
</trkpt>
<trkpt lat="45.185318" lon="7.079987">
   <ele>2420.072021</ele>
   <time>2021-07-02T07:59:56Z</time>
</trkpt>
<trkpt lat="45.185440" lon="7.080074">
   <ele>2424.220215</ele>
   <time>2021-07-02T08:00:15Z</time>
</trkpt>
<trkpt lat="45.185556" lon="7.080176">
   <ele>2427.573242</ele>
   <time>2021-07-02T08:00:33Z</time>
</trkpt>
<trkpt lat="45.185665" lon="7.080294">
   <ele>2430.056885</ele>
   <time>2021-07-02T08:00:53Z</time>
</trkpt>
<trkpt lat="45.185801" lon="7.080396">
   <ele>2434.416260</ele>
   <time>2021-07-02T08:01:09Z</time>
</trkpt>
<trkpt lat="45.185938" lon="7.080447">
   <ele>2439.598877</ele>
   <time>2021-07-02T08:01:32Z</time>
</trkpt>
<trkpt lat="45.186072" lon="7.080475">
   <ele>2445.104980</ele>
   <time>2021-07-02T08:02:02Z</time>
</trkpt>
<trkpt lat="45.186205" lon="7.080438">
   <ele>2452.479492</ele>
   <time>2021-07-02T08:02:35Z</time>
</trkpt>
<trkpt lat="45.186342" lon="7.080420">
   <ele>2459.509277</ele>
   <time>2021-07-02T08:03:58Z</time>
</trkpt>
<trkpt lat="45.186459" lon="7.080320">
   <ele>2468.264160</ele>
   <time>2021-07-02T08:04:31Z</time>
</trkpt>
<trkpt lat="45.186563" lon="7.080197">
   <ele>2477.299805</ele>
   <time>2021-07-02T08:05:59Z</time>
</trkpt>
<trkpt lat="45.186677" lon="7.080090">
   <ele>2486.405029</ele>
   <time>2021-07-02T08:06:35Z</time>
</trkpt>
<trkpt lat="45.186803" lon="7.080018">
   <ele>2493.906250</ele>
   <time>2021-07-02T08:06:55Z</time>
</trkpt>
<trkpt lat="45.186675" lon="7.079931">
   <ele>2491.198242</ele>
   <time>2021-07-02T08:07:33Z</time>
</trkpt>
<trkpt lat="45.186600" lon="7.079772">
   <ele>2491.528809</ele>
   <time>2021-07-02T08:08:28Z</time>
</trkpt>
<trkpt lat="45.186567" lon="7.079574">
   <ele>2494.923828</ele>
   <time>2021-07-02T08:08:57Z</time>
</trkpt>
<trkpt lat="45.186616" lon="7.079390">
   <ele>2502.307861</ele>
   <time>2021-07-02T08:09:45Z</time>
</trkpt>
<trkpt lat="45.186754" lon="7.079401">
   <ele>2509.590576</ele>
   <time>2021-07-02T08:10:28Z</time>
</trkpt>
<trkpt lat="45.186816" lon="7.079224">
   <ele>2518.284180</ele>
   <time>2021-07-02T08:10:47Z</time>
</trkpt>
<trkpt lat="45.186797" lon="7.079024">
   <ele>2522.626953</ele>
   <time>2021-07-02T08:11:20Z</time>
</trkpt>
<trkpt lat="45.186755" lon="7.078829">
   <ele>2525.205078</ele>
   <time>2021-07-02T08:12:03Z</time>
</trkpt>
<trkpt lat="45.186894" lon="7.078815">
   <ele>2534.531982</ele>
   <time>2021-07-02T08:12:45Z</time>
</trkpt>
<trkpt lat="45.186982" lon="7.078660">
   <ele>2544.746338</ele>
   <time>2021-07-02T08:13:21Z</time>
</trkpt>
<trkpt lat="45.187118" lon="7.078690">
   <ele>2552.879883</ele>
   <time>2021-07-02T08:14:17Z</time>
</trkpt>
<trkpt lat="45.187220" lon="7.078560">
   <ele>2563.858887</ele>
   <time>2021-07-02T08:14:54Z</time>
</trkpt>
<trkpt lat="45.187209" lon="7.078366">
   <ele>2569.318115</ele>
   <time>2021-07-02T08:15:36Z</time>
</trkpt>
<trkpt lat="45.187345" lon="7.078360">
   <ele>2579.142822</ele>
   <time>2021-07-02T08:15:59Z</time>
</trkpt>
<trkpt lat="45.187302" lon="7.078173">
   <ele>2579.143066</ele>
   <time>2021-07-02T08:18:42Z</time>
</trkpt>
<trkpt lat="45.187265" lon="7.077985">
   <ele>2578.910156</ele>
   <time>2021-07-02T08:19:22Z</time>
</trkpt>
<trkpt lat="45.187347" lon="7.077818">
   <ele>2587.567139</ele>
   <time>2021-07-02T08:20:41Z</time>
</trkpt>
<trkpt lat="45.187309" lon="7.077625">
   <ele>2587.272949</ele>
   <time>2021-07-02T08:21:07Z</time>
</trkpt>
<trkpt lat="45.187411" lon="7.077766">
   <ele>2593.431641</ele>
   <time>2021-07-02T08:21:39Z</time>
</trkpt>
<trkpt lat="45.187490" lon="7.077609">
   <ele>2602.393311</ele>
   <time>2021-07-02T08:22:37Z</time>
</trkpt>
<trkpt lat="45.187510" lon="7.077406">
   <ele>2603.085938</ele>
   <time>2021-07-02T08:23:11Z</time>
</trkpt>
<trkpt lat="45.187645" lon="7.077378">
   <ele>2610.589600</ele>
   <time>2021-07-02T08:23:54Z</time>
</trkpt>
<trkpt lat="45.187688" lon="7.077191">
   <ele>2609.292236</ele>
   <time>2021-07-02T08:24:31Z</time>
</trkpt>
<trkpt lat="45.187706" lon="7.076998">
   <ele>2606.404297</ele>
   <time>2021-07-02T08:25:03Z</time>
</trkpt>
<trkpt lat="45.187822" lon="7.077102">
   <ele>2616.520508</ele>
   <time>2021-07-02T08:25:45Z</time>
</trkpt>
<trkpt lat="45.187958" lon="7.077157">
   <ele>2626.612305</ele>
   <time>2021-07-02T08:26:14Z</time>
</trkpt>
<trkpt lat="45.188082" lon="7.077035">
   <ele>2633.637695</ele>
   <time>2021-07-02T08:27:02Z</time>
</trkpt>
<trkpt lat="45.188103" lon="7.076841">
   <ele>2633.240234</ele>
   <time>2021-07-02T08:29:02Z</time>
</trkpt>
<trkpt lat="45.188244" lon="7.076800">
   <ele>2643.601562</ele>
   <time>2021-07-02T08:30:40Z</time>
</trkpt>
<trkpt lat="45.188380" lon="7.076775">
   <ele>2653.169922</ele>
   <time>2021-07-02T08:31:01Z</time>
</trkpt>
<trkpt lat="45.188494" lon="7.076663">
   <ele>2660.170410</ele>
   <time>2021-07-02T08:31:23Z</time>
</trkpt>
<trkpt lat="45.188580" lon="7.076498">
   <ele>2663.428223</ele>
   <time>2021-07-02T08:31:45Z</time>
</trkpt>
<trkpt lat="45.188607" lon="7.076307">
   <ele>2662.769043</ele>
   <time>2021-07-02T08:32:09Z</time>
</trkpt>
<trkpt lat="45.188668" lon="7.076128">
   <ele>2665.102539</ele>
   <time>2021-07-02T08:32:29Z</time>
</trkpt>
<trkpt lat="45.188718" lon="7.075937">
   <ele>2666.957031</ele>
   <time>2021-07-02T08:32:49Z</time>
</trkpt>
<trkpt lat="45.188852" lon="7.075977">
   <ele>2677.964844</ele>
   <time>2021-07-02T08:33:34Z</time>
</trkpt>
<trkpt lat="45.188912" lon="7.076160">
   <ele>2683.838867</ele>
   <time>2021-07-02T08:33:54Z</time>
</trkpt>
<trkpt lat="45.189032" lon="7.076255">
   <ele>2693.187012</ele>
   <time>2021-07-02T08:34:38Z</time>
</trkpt>
<trkpt lat="45.189157" lon="7.076338">
   <ele>2702.292236</ele>
   <time>2021-07-02T08:35:03Z</time>
</trkpt>
<trkpt lat="45.189286" lon="7.076270">
   <ele>2708.719238</ele>
   <time>2021-07-02T08:35:30Z</time>
</trkpt>
<trkpt lat="45.189338" lon="7.076089">
   <ele>2712.028320</ele>
   <time>2021-07-02T08:36:06Z</time>
</trkpt>
<trkpt lat="45.189371" lon="7.075899">
   <ele>2714.710693</ele>
   <time>2021-07-02T08:36:34Z</time>
</trkpt>
<trkpt lat="45.189502" lon="7.075948">
   <ele>2721.804199</ele>
   <time>2021-07-02T08:37:05Z</time>
</trkpt>
<trkpt lat="45.189633" lon="7.076018">
   <ele>2728.327148</ele>
   <time>2021-07-02T08:38:23Z</time>
</trkpt>
<trkpt lat="45.189765" lon="7.076064">
   <ele>2734.804443</ele>
   <time>2021-07-02T08:39:11Z</time>
</trkpt>
<trkpt lat="45.189819" lon="7.075881">
   <ele>2740.595947</ele>
   <time>2021-07-02T08:40:01Z</time>
</trkpt>
<trkpt lat="45.189838" lon="7.075690">
   <ele>2742.303223</ele>
   <time>2021-07-02T08:40:31Z</time>
</trkpt>
<trkpt lat="45.189826" lon="7.075494">
   <ele>2741.270020</ele>
   <time>2021-07-02T08:40:52Z</time>
</trkpt>
<trkpt lat="45.189856" lon="7.075302">
   <ele>2742.849854</ele>
   <time>2021-07-02T08:41:16Z</time>
</trkpt>
<trkpt lat="45.189981" lon="7.075386">
   <ele>2750.820557</ele>
   <time>2021-07-02T08:42:00Z</time>
</trkpt>
<trkpt lat="45.190058" lon="7.075548">
   <ele>2754.782715</ele>
   <time>2021-07-02T08:42:18Z</time>
</trkpt>
<trkpt lat="45.190128" lon="7.075364">
   <ele>2758.987061</ele>
   <time>2021-07-02T08:43:16Z</time>
</trkpt>
<trkpt lat="45.190185" lon="7.075184">
   <ele>2763.403809</ele>
   <time>2021-07-02T08:43:38Z</time>
</trkpt>
<trkpt lat="45.190302" lon="7.075280">
   <ele>2769.515625</ele>
   <time>2021-07-02T08:44:27Z</time>
</trkpt>
<trkpt lat="45.190412" lon="7.075408">
   <ele>2773.865234</ele>
   <time>2021-07-02T08:44:53Z</time>
</trkpt>
<trkpt lat="45.190543" lon="7.075484">
   <ele>2779.280273</ele>
   <time>2021-07-02T08:45:20Z</time>
</trkpt>
<trkpt lat="45.190661" lon="7.075587">
   <ele>2782.693115</ele>
   <time>2021-07-02T08:45:42Z</time>
</trkpt>
<trkpt lat="45.190782" lon="7.075677">
   <ele>2785.677734</ele>
   <time>2021-07-02T08:45:58Z</time>
</trkpt>
<trkpt lat="45.190917" lon="7.075714">
   <ele>2789.225830</ele>
   <time>2021-07-02T08:46:28Z</time>
</trkpt>
<trkpt lat="45.190892" lon="7.075519">
   <ele>2794.825684</ele>
   <time>2021-07-02T08:48:24Z</time>
</trkpt>
<trkpt lat="45.191032" lon="7.075506">
   <ele>2800.093994</ele>
   <time>2021-07-02T08:52:53Z</time>
</trkpt>
<trkpt lat="45.191157" lon="7.075587">
   <ele>2801.356934</ele>
   <time>2021-07-02T08:53:15Z</time>
</trkpt>
<trkpt lat="45.191115" lon="7.075398">
   <ele>2807.017334</ele>
   <time>2021-07-02T08:53:50Z</time>
</trkpt>
<trkpt lat="45.191014" lon="7.075251">
   <ele>2808.442383</ele>
   <time>2021-07-02T08:54:12Z</time>
</trkpt>
<trkpt lat="45.190916" lon="7.075108">
   <ele>2809.226318</ele>
   <time>2021-07-02T08:54:47Z</time>
</trkpt>
<trkpt lat="45.190838" lon="7.074947">
   <ele>2809.138428</ele>
   <time>2021-07-02T08:55:15Z</time>
</trkpt>
<trkpt lat="45.190970" lon="7.074902">
   <ele>2815.324951</ele>
   <time>2021-07-02T08:55:57Z</time>
</trkpt>
<trkpt lat="45.191085" lon="7.074800">
   <ele>2821.027344</ele>
   <time>2021-07-02T09:32:49Z</time>
</trkpt>
<trkpt lat="45.191203" lon="7.074897">
   <ele>2826.318848</ele>
   <time>2021-07-02T09:35:33Z</time>
</trkpt>
<trkpt lat="45.191333" lon="7.074950">
   <ele>2832.117432</ele>
   <time>2021-07-02T09:35:53Z</time>
</trkpt>
<trkpt lat="45.191469" lon="7.074935">
   <ele>2838.558350</ele>
   <time>2021-07-02T09:36:22Z</time>
</trkpt>
<trkpt lat="45.191613" lon="7.074990">
   <ele>2844.645996</ele>
   <time>2021-07-02T09:36:43Z</time>
</trkpt>
<trkpt lat="45.191735" lon="7.075075">
   <ele>2846.987305</ele>
   <time>2021-07-02T09:37:05Z</time>
</trkpt>
<trkpt lat="45.191877" lon="7.075048">
   <ele>2856.000000</ele>
   <time>2021-07-02T09:37:30Z</time>
</trkpt>
<trkpt lat="45.192014" lon="7.075058">
   <ele>2862.911621</ele>
   <time>2021-07-02T09:38:06Z</time>
</trkpt>
<trkpt lat="45.192151" lon="7.075044">
   <ele>2871.021729</ele>
   <time>2021-07-02T09:38:46Z</time>
</trkpt>
<trkpt lat="45.192282" lon="7.075094">
   <ele>2875.689941</ele>
   <time>2021-07-02T09:39:17Z</time>
</trkpt>
<trkpt lat="45.192416" lon="7.075136">
   <ele>2880.916016</ele>
   <time>2021-07-02T09:39:55Z</time>
</trkpt>
<trkpt lat="45.192542" lon="7.075207">
   <ele>2884.498779</ele>
   <time>2021-07-02T09:40:36Z</time>
</trkpt>
<trkpt lat="45.192677" lon="7.075244">
   <ele>2890.343750</ele>
   <time>2021-07-02T09:41:03Z</time>
</trkpt>
<trkpt lat="45.192822" lon="7.075254">
   <ele>2898.143066</ele>
   <time>2021-07-02T09:41:28Z</time>
</trkpt>
<trkpt lat="45.192955" lon="7.075290">
   <ele>2903.837891</ele>
   <time>2021-07-02T09:41:54Z</time>
</trkpt>
<trkpt lat="45.193094" lon="7.075310">
   <ele>2910.721680</ele>
   <time>2021-07-02T09:43:09Z</time>
</trkpt>
<trkpt lat="45.193230" lon="7.075341">
   <ele>2916.763672</ele>
   <time>2021-07-02T09:43:35Z</time>
</trkpt>
<trkpt lat="45.193359" lon="7.075421">
   <ele>2919.910645</ele>
   <time>2021-07-02T09:45:11Z</time>
</trkpt>
<trkpt lat="45.193491" lon="7.075469">
   <ele>2925.537109</ele>
   <time>2021-07-02T09:45:29Z</time>
</trkpt>
<trkpt lat="45.193606" lon="7.075571">
   <ele>2927.042236</ele>
   <time>2021-07-02T09:45:54Z</time>
</trkpt>
<trkpt lat="45.193735" lon="7.075631">
   <ele>2931.772949</ele>
   <time>2021-07-02T09:46:15Z</time>
</trkpt>
<trkpt lat="45.193868" lon="7.075669">
   <ele>2937.878906</ele>
   <time>2021-07-02T09:46:49Z</time>
</trkpt>
<trkpt lat="45.194005" lon="7.075736">
   <ele>2942.537354</ele>
   <time>2021-07-02T09:47:25Z</time>
</trkpt>
<trkpt lat="45.194122" lon="7.075834">
   <ele>2944.231445</ele>
   <time>2021-07-02T09:48:24Z</time>
</trkpt>
<trkpt lat="45.194218" lon="7.075977">
   <ele>2946.322266</ele>
   <time>2021-07-02T09:48:40Z</time>
</trkpt>
<trkpt lat="45.194324" lon="7.076105">
   <ele>2950.497803</ele>
   <time>2021-07-02T09:49:01Z</time>
</trkpt>
<trkpt lat="45.194411" lon="7.076264">
   <ele>2952.857666</ele>
   <time>2021-07-02T09:49:21Z</time>
</trkpt>
<trkpt lat="45.194496" lon="7.076444">
   <ele>2954.810303</ele>
   <time>2021-07-02T09:49:37Z</time>
</trkpt>
<trkpt lat="45.194594" lon="7.076583">
   <ele>2959.449219</ele>
   <time>2021-07-02T09:50:00Z</time>
</trkpt>
<trkpt lat="45.194655" lon="7.076760">
   <ele>2962.172852</ele>
   <time>2021-07-02T09:50:20Z</time>
</trkpt>
<trkpt lat="45.194695" lon="7.076953">
   <ele>2964.759033</ele>
   <time>2021-07-02T09:50:36Z</time>
</trkpt>
<trkpt lat="45.194768" lon="7.077119">
   <ele>2970.226807</ele>
   <time>2021-07-02T09:51:22Z</time>
</trkpt>
<trkpt lat="45.194887" lon="7.077222">
   <ele>2979.759766</ele>
   <time>2021-07-02T09:52:21Z</time>
</trkpt>
<trkpt lat="45.194964" lon="7.077386">
   <ele>2985.552246</ele>
   <time>2021-07-02T09:52:41Z</time>
</trkpt>
<trkpt lat="45.195067" lon="7.077521">
   <ele>2992.736572</ele>
   <time>2021-07-02T09:53:28Z</time>
</trkpt>
<trkpt lat="45.195173" lon="7.077666">
   <ele>2997.102051</ele>
   <time>2021-07-02T09:53:55Z</time>
</trkpt>
<trkpt lat="45.195287" lon="7.077779">
   <ele>3002.878174</ele>
   <time>2021-07-02T09:54:27Z</time>
</trkpt>
<trkpt lat="45.195382" lon="7.077921">
   <ele>3006.364746</ele>
   <time>2021-07-02T09:55:01Z</time>
</trkpt>
<trkpt lat="45.195479" lon="7.078059">
   <ele>3010.062988</ele>
   <time>2021-07-02T09:55:33Z</time>
</trkpt>
<trkpt lat="45.195560" lon="7.078219">
   <ele>3011.727539</ele>
   <time>2021-07-02T09:55:57Z</time>
</trkpt>
<trkpt lat="45.195629" lon="7.078391">
   <ele>3011.931641</ele>
   <time>2021-07-02T09:56:18Z</time>
</trkpt>
<trkpt lat="45.195721" lon="7.078536">
   <ele>3014.509277</ele>
   <time>2021-07-02T09:58:21Z</time>
</trkpt>
<trkpt lat="45.195840" lon="7.078639">
   <ele>3020.645508</ele>
   <time>2021-07-02T09:59:16Z</time>
</trkpt>
<trkpt lat="45.195952" lon="7.078751">
   <ele>3025.847168</ele>
   <time>2021-07-02T09:59:45Z</time>
</trkpt>
<trkpt lat="45.196070" lon="7.078851">
   <ele>3031.203857</ele>
   <time>2021-07-02T10:00:25Z</time>
</trkpt>
<trkpt lat="45.196195" lon="7.078937">
   <ele>3036.937744</ele>
   <time>2021-07-02T10:00:59Z</time>
</trkpt>
<trkpt lat="45.196261" lon="7.078767">
   <ele>3049.567871</ele>
   <time>2021-07-02T10:02:48Z</time>
</trkpt>
<trkpt lat="45.196203" lon="7.078580">
   <ele>3053.242432</ele>
   <time>2021-07-02T10:03:04Z</time>
</trkpt>
<trkpt lat="45.196201" lon="7.078385">
   <ele>3061.751953</ele>
   <time>2021-07-02T10:03:33Z</time>
</trkpt>
<trkpt lat="45.196197" lon="7.078185">
   <ele>3067.867188</ele>
   <time>2021-07-02T10:03:57Z</time>
</trkpt>
<trkpt lat="45.196232" lon="7.077997">
   <ele>3076.384766</ele>
   <time>2021-07-02T10:05:28Z</time>
</trkpt>
<trkpt lat="45.196220" lon="7.077804">
   <ele>3080.717773</ele>
   <time>2021-07-02T10:06:00Z</time>
</trkpt>
<trkpt lat="45.196211" lon="7.077612">
   <ele>3085.358887</ele>
   <time>2021-07-02T10:06:17Z</time>
</trkpt>
<trkpt lat="45.196204" lon="7.077418">
   <ele>3089.254883</ele>
   <time>2021-07-02T10:06:39Z</time>
</trkpt>
<trkpt lat="45.196342" lon="7.077439">
   <ele>3101.074951</ele>
   <time>2021-07-02T10:09:33Z</time>
</trkpt>
<trkpt lat="45.196429" lon="7.077277">
   <ele>3111.202637</ele>
   <time>2021-07-02T10:11:09Z</time>
</trkpt>
<trkpt lat="45.196427" lon="7.077084">
   <ele>3113.890869</ele>
   <time>2021-07-02T10:11:57Z</time>
</trkpt>
<trkpt lat="45.196441" lon="7.076888">
   <ele>3118.041748</ele>
   <time>2021-07-02T10:12:24Z</time>
</trkpt>
<trkpt lat="45.196424" lon="7.076697">
   <ele>3119.447754</ele>
   <time>2021-07-02T10:12:44Z</time>
</trkpt>
<trkpt lat="45.196469" lon="7.076515">
   <ele>3126.499023</ele>
   <time>2021-07-02T10:13:07Z</time>
</trkpt>
<trkpt lat="45.196494" lon="7.076327">
   <ele>3132.096191</ele>
   <time>2021-07-02T10:13:37Z</time>
</trkpt>
<trkpt lat="45.196480" lon="7.076137">
   <ele>3134.482910</ele>
   <time>2021-07-02T10:14:10Z</time>
</trkpt>
<trkpt lat="45.196534" lon="7.075955">
   <ele>3142.240967</ele>
   <time>2021-07-02T10:14:48Z</time>
</trkpt>
<trkpt lat="45.196552" lon="7.075760">
   <ele>3146.400635</ele>
   <time>2021-07-02T10:15:25Z</time>
</trkpt>
<trkpt lat="45.196625" lon="7.075598">
   <ele>3152.844238</ele>
   <time>2021-07-02T10:16:08Z</time>
</trkpt>
<trkpt lat="45.196639" lon="7.075403">
   <ele>3154.706787</ele>
   <time>2021-07-02T10:17:03Z</time>
</trkpt>
<trkpt lat="45.196633" lon="7.075209">
   <ele>3155.213379</ele>
   <time>2021-07-02T10:17:45Z</time>
</trkpt>
<trkpt lat="45.196647" lon="7.075015">
   <ele>3156.824463</ele>
   <time>2021-07-02T10:18:11Z</time>
</trkpt>
<trkpt lat="45.196784" lon="7.075010">
   <ele>3157.893799</ele>
   <time>2021-07-02T10:19:07Z</time>
</trkpt>
<trkpt lat="45.196931" lon="7.075053">
   <ele>3158.315674</ele>
   <time>2021-07-02T10:20:00Z</time>
</trkpt>
<trkpt lat="45.197021" lon="7.075207">
   <ele>3161.165527</ele>
   <time>2021-07-02T10:20:35Z</time>
</trkpt>
<trkpt lat="45.197137" lon="7.075313">
   <ele>3164.992432</ele>
   <time>2021-07-02T10:24:45Z</time>
</trkpt>
<trkpt lat="45.197250" lon="7.075434">
   <ele>3170.680176</ele>
   <time>2021-07-02T10:25:22Z</time>
</trkpt>
<trkpt lat="45.197352" lon="7.075564">
   <ele>3177.963135</ele>
   <time>2021-07-02T10:26:04Z</time>
</trkpt>
<trkpt lat="45.197450" lon="7.075702">
   <ele>3186.970459</ele>
   <time>2021-07-02T10:28:03Z</time>
</trkpt>
<trkpt lat="45.197561" lon="7.075831">
   <ele>3194.657715</ele>
   <time>2021-07-02T10:29:34Z</time>
</trkpt>
<trkpt lat="45.197616" lon="7.076012">
   <ele>3197.449219</ele>
   <time>2021-07-02T10:30:02Z</time>
</trkpt>
<trkpt lat="45.197672" lon="7.076189">
   <ele>3201.421875</ele>
   <time>2021-07-02T10:30:20Z</time>
</trkpt>
<trkpt lat="45.197711" lon="7.076389">
   <ele>3206.661621</ele>
   <time>2021-07-02T10:30:43Z</time>
</trkpt>
<trkpt lat="45.197809" lon="7.076523">
   <ele>3213.801025</ele>
   <time>2021-07-02T10:32:09Z</time>
</trkpt>
<trkpt lat="45.197851" lon="7.076712">
   <ele>3219.538574</ele>
   <time>2021-07-02T10:32:36Z</time>
</trkpt>
<trkpt lat="45.197987" lon="7.076707">
   <ele>3226.544189</ele>
   <time>2021-07-02T10:33:39Z</time>
</trkpt>
<trkpt lat="45.198057" lon="7.076538">
   <ele>3224.882080</ele>
   <time>2021-07-02T10:35:00Z</time>
</trkpt>
<trkpt lat="45.198188" lon="7.076493">
   <ele>3228.126709</ele>
   <time>2021-07-02T10:36:13Z</time>
</trkpt>
<trkpt lat="45.198290" lon="7.076367">
   <ele>3224.569336</ele>
   <time>2021-07-02T10:38:48Z</time>
</trkpt>
<trkpt lat="45.198428" lon="7.076377">
   <ele>3227.376465</ele>
   <time>2021-07-02T10:40:19Z</time>
</trkpt>
<trkpt lat="45.198557" lon="7.076317">
   <ele>3224.198242</ele>
   <time>2021-07-02T10:46:11Z</time>
</trkpt>
<trkpt lat="45.198598" lon="7.076134">
   <ele>3210.802734</ele>
   <time>2021-07-02T10:46:32Z</time>
</trkpt>
<trkpt lat="45.198735" lon="7.076138">
   <ele>3210.986572</ele>
   <time>2021-07-02T10:48:07Z</time>
</trkpt>
<trkpt lat="45.198809" lon="7.076299">
   <ele>3224.271973</ele>
   <time>2021-07-02T10:48:42Z</time>
</trkpt>
<trkpt lat="45.198912" lon="7.076174">
   <ele>3213.948486</ele>
   <time>2021-07-02T10:49:32Z</time>
</trkpt>
<trkpt lat="45.199028" lon="7.076273">
   <ele>3223.137207</ele>
   <time>2021-07-02T10:51:47Z</time>
</trkpt>
<trkpt lat="45.199162" lon="7.076306">
   <ele>3226.934326</ele>
   <time>2021-07-02T10:53:54Z</time>
</trkpt>
<trkpt lat="45.199270" lon="7.076428">
   <ele>3243.501709</ele>
   <time>2021-07-02T10:58:26Z</time>
</trkpt>
<trkpt lat="45.199408" lon="7.076400">
   <ele>3247.179443</ele>
   <time>2021-07-02T11:00:51Z</time>
</trkpt>
<trkpt lat="45.199553" lon="7.076434">
   <ele>3256.953613</ele>
   <time>2021-07-02T11:01:06Z</time>
</trkpt>
<trkpt lat="45.199696" lon="7.076472">
   <ele>3266.755859</ele>
   <time>2021-07-02T11:01:22Z</time>
</trkpt>
<trkpt lat="45.199835" lon="7.076491">
   <ele>3274.671143</ele>
   <time>2021-07-02T11:02:16Z</time>
</trkpt>
<trkpt lat="45.199967" lon="7.076569">
   <ele>3287.264404</ele>
   <time>2021-07-02T11:02:59Z</time>
</trkpt>
<trkpt lat="45.200099" lon="7.076528">
   <ele>3290.487549</ele>
   <time>2021-07-02T11:03:23Z</time>
</trkpt>
<trkpt lat="45.200233" lon="7.076568">
   <ele>3300.458496</ele>
   <time>2021-07-02T11:03:48Z</time>
</trkpt>
<trkpt lat="45.200364" lon="7.076490">
   <ele>3302.090088</ele>
   <time>2021-07-02T11:04:14Z</time>
</trkpt>
<trkpt lat="45.200499" lon="7.076499">
   <ele>3310.043701</ele>
   <time>2021-07-02T11:05:23Z</time>
</trkpt>
<trkpt lat="45.200638" lon="7.076530">
   <ele>3319.201416</ele>
   <time>2021-07-02T11:06:49Z</time>
</trkpt>
<trkpt lat="45.200774" lon="7.076559">
   <ele>3327.688477</ele>
   <time>2021-07-02T11:07:07Z</time>
</trkpt>
<trkpt lat="45.200913" lon="7.076581">
   <ele>3335.136719</ele>
   <time>2021-07-02T11:08:41Z</time>
</trkpt>
<trkpt lat="45.201046" lon="7.076616">
   <ele>3342.428955</ele>
   <time>2021-07-02T11:09:06Z</time>
</trkpt>
<trkpt lat="45.201178" lon="7.076674">
   <ele>3349.649658</ele>
   <time>2021-07-02T11:09:49Z</time>
</trkpt>
<trkpt lat="45.201304" lon="7.076756">
   <ele>3348.315918</ele>
   <time>2021-07-02T11:11:12Z</time>
</trkpt>
<trkpt lat="45.201425" lon="7.076842">
   <ele>3346.239746</ele>
   <time>2021-07-02T11:11:38Z</time>
</trkpt>
<trkpt lat="45.201560" lon="7.076884">
   <ele>3348.385010</ele>
   <time>2021-07-02T11:12:24Z</time>
</trkpt>
<trkpt lat="45.201692" lon="7.076935">
   <ele>3351.467773</ele>
   <time>2021-07-02T11:13:35Z</time>
</trkpt>
<trkpt lat="45.201818" lon="7.077012">
   <ele>3359.817139</ele>
   <time>2021-07-02T11:16:38Z</time>
</trkpt>
<trkpt lat="45.201947" lon="7.077070">
   <ele>3370.514160</ele>
   <time>2021-07-02T11:17:20Z</time>
</trkpt>
<trkpt lat="45.202083" lon="7.077080">
   <ele>3386.202881</ele>
   <time>2021-07-02T11:18:30Z</time>
</trkpt>
<trkpt lat="45.202179" lon="7.077223">
   <ele>3387.492676</ele>
   <time>2021-07-02T11:20:09Z</time>
</trkpt>
<trkpt lat="45.202317" lon="7.077270">
   <ele>3401.430176</ele>
   <time>2021-07-02T11:20:49Z</time>
</trkpt>
<trkpt lat="45.202448" lon="7.077315">
   <ele>3415.122314</ele>
   <time>2021-07-02T11:22:30Z</time>
</trkpt>
<trkpt lat="45.202506" lon="7.077139">
   <ele>3433.414551</ele>
   <time>2021-07-02T11:27:29Z</time>
</trkpt>
<trkpt lat="45.202642" lon="7.077172">
   <ele>3442.579590</ele>
   <time>2021-07-02T11:32:08Z</time>
</trkpt>
<trkpt lat="45.202769" lon="7.077106">
   <ele>3456.131348</ele>
   <time>2021-07-02T11:34:48Z</time>
</trkpt>
<trkpt lat="45.202882" lon="7.077219">
   <ele>3460.447266</ele>
   <time>2021-07-02T11:35:49Z</time>
</trkpt>
<trkpt lat="45.202982" lon="7.077359">
   <ele>3464.357910</ele>
   <time>2021-07-02T11:36:56Z</time>
</trkpt>
<trkpt lat="45.203121" lon="7.077322">
   <ele>3478.369141</ele>
   <time>2021-07-02T11:39:05Z</time>
</trkpt>
<trkpt lat="45.203248" lon="7.077385">
   <ele>3489.101318</ele>
   <time>2021-07-02T11:40:24Z</time>
</trkpt>
<trkpt lat="45.203355" lon="7.077507">
   <ele>3495.996094</ele>
   <time>2021-07-02T11:41:29Z</time>
</trkpt>
<trkpt lat="45.203491" lon="7.077485">
   <ele>3498.399658</ele>
   <time>2021-07-02T11:42:16Z</time>
</trkpt>
<trkpt lat="45.203388" lon="7.077354">
   <ele>3498.269287</ele>
   <time>2021-07-02T11:45:46Z</time>
</trkpt>
<trkpt lat="45.203531" lon="7.077340">
   <ele>3500.161133</ele>
   <time>2021-07-02T11:49:04Z</time>
</trkpt>
</trkseg></trk></gpx>
`;
