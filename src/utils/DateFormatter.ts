export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true 
    };
    
    return date.toLocaleString("en-US", options);
  }
 

  export function formatSunriseSunset(sunriseTimestamp: number, sunsetTimestamp: number, timezoneOffsetSeconds: number): { sunrise: string, sunset: string } {
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
  

    const sunriseLocalTime = new Date(sunriseDate.getTime() + timezoneOffsetSeconds * 1000);
    const sunsetLocalTime = new Date(sunsetDate.getTime() + timezoneOffsetSeconds * 1000);
  

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  

    const sunriseTime = sunriseLocalTime.toLocaleTimeString('en-US', options);
    const sunsetTime = sunsetLocalTime.toLocaleTimeString('en-US', options);
  

    return {
      sunrise: sunriseTime,
      sunset: sunsetTime
    };
  }
  

  

  