export function systemInfo(data: any)
{
    log(LogType.Info, [ "System" ], data);
}

export function systemError(data: any)
{
    log(LogType.Error, [ "System" ], data);
}

export function commandInfo(commandName: string, data: any)
{
    log(LogType.Info, [ "Commands", commandName ], data);
}

export function commandError(commandName: string, data: any)
{
    log(LogType.Error, [ "Commands", commandName ], data);
}

export function eventInfo(eventName: string, data: any)
{
    log(LogType.Info, [ "Events", eventName ], data);
}

export function eventError(eventName: string, data: any)
{
    log(LogType.Error, [ "Events", eventName ], data);
}


function log(logType: LogType, predata: string[], data)
{
    const pre = predata.join(" | ");

    if (logType === LogType.Info)
        console.log(`[${pre}] ${data}`);
    else if (logType === LogType.Error)
        console.error(`[${pre}] ${data}`);
}

enum LogType
{
    Info,
    Error
}