import { NextResponse } from "next/server";

export async function GET(req, res) {
    return NextResponse.json({
        status: "OK",
            application: true,
            startTime: `/Date(${new Date().getTime()})/`,
    }, {status: 200})
  }