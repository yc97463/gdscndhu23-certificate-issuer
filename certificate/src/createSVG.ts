import QRcode from "qrcode-svg";
function mappingNum(x: number) {
    return ((x * 340.3) / 120).toString();
}

export default function createSVGs({
    attendee, event, type, slug, date, time, place, hours, url, realm, issuer
}: {
    attendee: string;
    event: string;
    type: string;
    slug: string;
    date: string;
    time: string;
    place: string;
    hours: number;
    url: string;
    realm: string;
    issuer: string;
}) {
    const attendees = attendee.split("\n");
    let result = [];
    for (let i = 0; i < attendees.length; i++) {
        result.push(
            createSVG({
                attendee: attendees[i],
                event,
                type,
                slug,
                date,
                time,
                place,
                hours,
                url,
                realm,
                issuer, 
                page: i + 1,
                totalPage: attendees.length,
            })
        );
    }
    return result;
}
export function createSVG({
    attendee, event, type, slug, date, time, place, hours, url, realm, issuer, page, totalPage,
}: {
    attendee: string;
    event: string;
    type: string;
    slug: string;
    date: string;
    time: string;
    place: string;
    hours: number;
    url: string;
    realm: string;
    issuer: string;
    page: number;
    totalPage: number;
}) {
    // Create an SVG element
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("viewBox", "0 0 595.44 841.68");
    svg.setAttribute(
        "style",
        `font-family: "Product Sans", "Noto Sans TC", serif; font-weight: 400;`
    );

    // GDSC info
    const parse_date = new Date(date);
    let certificate_id: string = "";
    
    const gdsc = {
        year: "gdscndhu",
        event: {
            type: type,
            slug: slug,
            name: event,
            url: url,
            date: parse_date,
            time: time,
            hours: hours,
            place: place,
            realm: realm,
        },
    }
    let isSpecificHours = gdsc.event.hours == 0;
    let attendeeFieldRemoveLastField = "";
    if (isSpecificHours) {
        attendeeFieldRemoveLastField = attendee.split("\t").slice(0, -1).join("\t");
    }


    // 
    // 背景
    // 
    {
        let rect = document.createElementNS(svgns, "rect");
        rect.setAttribute("x", "0");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "595.44");
        rect.setAttribute("height", "841.68");
        // rect.setAttribute("fill", "#f2f2f2");
        rect.setAttribute("fill", "#FFF");
        svg.appendChild(rect);
    }

    // 
    // header banner (img)
    // 
    {
        let img = document.createElementNS(svgns, "image");
        img.setAttribute("width", "500");
        // place at the center
        img.setAttribute("x", "47.72");
        img.setAttribute("y", "50");
        img.setAttribute("href", "./gdsc-banner.png");
        svg.appendChild(img);
    }

    //
    // container
    // 
    {
        let rect = document.createElementNS(svgns, "rect");
        rect.setAttribute("x", "47.72");
        rect.setAttribute("y", "250");
        rect.setAttribute("width", "500");
        rect.setAttribute("height", "480");
        rect.setAttribute("fill", "#4285F4");
        svg.appendChild(rect);
    }

    // 
    // title in the container block
    // 
    {
        let text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", "340");
        text.style.fontSize = "20px";
        // event title 自動換行
        let title = `${gdsc.event.name} (${gdsc.event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
        let title1 = title;
        let title2 = "";
        if (title.length > 22) {
            title1 = title.slice(0, 22);
            title2 = title.slice(22);
        }
        text.textContent = title1;
        text.setAttribute("fill", "#FFF");
        svg.append(text);
        if (title2) {
            text = document.createElementNS(svgns, "text");
            text.setAttribute("x", "120");
            text.setAttribute("y", "370");
            text.style.fontSize = "20px";
            text.textContent = title2;
            text.setAttribute("fill", "#FFF");
            svg.append(text);
        }
        text.setAttribute("fill", "#FFF");
        svg.append(text);
    }

    // 
    // text in the container block
    // 
    {
        let text = document.createElementNS(svgns, "text");

        text.setAttribute("x", "120");
        text.setAttribute("y", "420");
        text.style.fontSize = "15px";
        
        // 參與者的第四欄是隱藏欄位，用來放個別參與者的時數
        // 如果「核發時數」設 0 則會觸發使用參與者的第四欄位，所以在這裡呈現的參與者資訊需去除最後一個（第四欄）欄位
        text.textContent = `${isSpecificHours ? attendeeFieldRemoveLastField : attendee} 活動參與時數證明`;
        text.setAttribute("fill", "#FFF");
        svg.append(text);
    }

    // 
    // event info in the container block
    //
    {
        
        let text = document.createElementNS(svgns, "text");
        let is2Line = false;

        if (gdsc.event.name.length > 40) {
            let name1 = gdsc.event.name.slice(0, 40);
            let name2 = gdsc.event.name.slice(40);
            is2Line = true;

            // for name 1
            text = document.createElementNS(svgns, "text");
            text.setAttribute("x", "120");
            text.setAttribute("y", "460");
            text.style.fontSize = "15px";
            text.textContent = `活動名稱：${name1}`;
            text.setAttribute("fill", "#FFF");
            svg.append(text);

            // for name 2
            text = document.createElementNS(svgns, "text");
            text.setAttribute("x", "195");
            text.setAttribute("y", "480");
            text.style.fontSize = "15px";
            text.textContent = name2;
            text.setAttribute("fill", "#FFF");
            svg.append(text);
        } else {
            text = document.createElementNS(svgns, "text");
            text.setAttribute("x", "120");
            text.setAttribute("y", "460");
            text.style.fontSize = "15px";
            text.textContent = `活動名稱：${gdsc.event.name}`;
            text.setAttribute("fill", "#FFF");
            svg.append(text);
        }
        // text.textContent = `活動名稱：${gdsc.event.name}`;
        // text.setAttribute("fill", "#FFF");
        
        // svg.append(text); 

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", `${480+ (is2Line ? 20 : 0)}`);
        text.style.fontSize = "15px";
        text.textContent = `活動時間：${gdsc.event.date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ${gdsc.event.time}`;
        text.setAttribute("fill", "#FFF");
        svg.append(text);

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", `${500+ (is2Line ? 20 : 0)}`);
        text.style.fontSize = "15px";
        text.textContent = `活動地點：${gdsc.event.place}`;
        text.setAttribute("fill", "#FFF");
        svg.append(text);

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", `${520+ (is2Line ? 20 : 0)}`);
        text.style.fontSize = "15px";
        text.textContent = `活動連結：${gdsc.event.url}`;
        text.setAttribute("fill", "#FFF");
        svg.append(text);

        // 活動時數
        // 如果是特定時數，則使用參與者第四欄的時數
        let hoursFromAttendeeField = attendee.split("\t").slice(-1)[0];

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", `${540+ (is2Line ? 20 : 0)}`);
        text.style.fontSize = "15px";
        text.textContent = `活動時數：${gdsc.event.realm} ${isSpecificHours ? hoursFromAttendeeField : gdsc.event.hours} 小時`;
        text.setAttribute("fill", "#FFF");
        svg.append(text);
    }

    // 
    // Lead signture on the right in the container block
    // 
    {
        let text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", "600");
        text.style.fontSize = "15px";
        text.textContent = "LEAD";
        text.setAttribute("fill", "#FFF");
        svg.append(text);

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", "625");
        text.style.fontSize = "15px";
        text.textContent = issuer;
        text.setAttribute("fill", "#FFF");
        // bold
        text.style.fontWeight = "bold";
        svg.append(text);

        // put a signature line
        let line = document.createElementNS(svgns, "line");
        line.setAttribute("x1", "120");
        line.setAttribute("y1", "630");
        line.setAttribute("x2", "300");
        line.setAttribute("y2", "630");
        line.setAttribute("stroke", "#FFF");
        line.setAttribute("stroke-width", "1");
        svg.append(line);
        
        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", "650");
        text.style.fontSize = "15px";
        text.textContent = "Google Developer Student Clubs";
        text.setAttribute("fill", "#FFF");
        svg.append(text);

        text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "120");
        text.setAttribute("y", "675");
        text.style.fontSize = "15px";
        text.textContent = "National Dong Hwa University";
        text.setAttribute("fill", "#FFF");
        svg.append(text);
    }

    // 
    // info after container 
    // 
    {
        let text = document.createElementNS(svgns, "text");
        text.setAttribute("x", "48");
        text.setAttribute("y", "760");
        text.style.fontSize = "14px";
        text.textContent = `更多資訊，歡迎您瀏覽我們的網站： https://dscndhu.blogspot.com 🫶`;
        svg.append(text);
    }

    //
    // 證書及頁面編號
    //
    {
        {
            // Create a text element
            let text = document.createElementNS(svgns, "text");
            text.setAttribute("x", "40");
            text.setAttribute("y", mappingNum(285));
            text.style.fontSize = "11px";
            // only show the full year and month like 202405 for May 2024
            let year = gdsc.event.date.getFullYear();
            let month = gdsc.event.date.getMonth() + 1;
            certificate_id = `${gdsc.year}-${year}${month<10 ? `0${month}` : month}-${gdsc.event.type}-${gdsc.event.slug}-${page}`;
            text.textContent = `證書編號：${certificate_id} of ${totalPage}`;
            svg.append(text);
        }
    }

    // 
    // QR code
    // 
    {
        let qrcodeSvgString = new QRcode({
            content: `${certificate_id}-${isSpecificHours ? attendeeFieldRemoveLastField.replace( /\s/g, "-" ) : attendee.replace( /\s/g, "-" )}`,
            background: "transparent",
        }).svg();
        let qrcodeSvg = new DOMParser().parseFromString(
            qrcodeSvgString,
            "image/svg+xml"
        ).documentElement;
        const qrcodeSize = `65`;
        qrcodeSvg.setAttribute("x", `498`);
        qrcodeSvg.setAttribute("y", `772`);
        qrcodeSvg.setAttribute("width", qrcodeSize);
        qrcodeSvg.setAttribute("height", qrcodeSize);
        qrcodeSvg.setAttribute("viewBox", "0 0 256 256");
        svg.appendChild(qrcodeSvg);

    }
    return svg;
}