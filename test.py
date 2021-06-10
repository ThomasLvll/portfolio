# coding: utf-8

import json

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport


_API_TOKEN = "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"

headers = {
    "Authorization": f"Bearer {_API_TOKEN}"
}

transport = AIOHTTPTransport(url="https://api.github.com/graphql", headers=headers)
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql(
    """
    {
        user(login: "ThomasLvll") {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            date
                            weekday
                            contributionLevel
                            contributionCount
                        }
                        firstDay
                    }
                    totalContributions
                }
            }
        }
    }
    """
)

themes = {
    "light": {
        "NONE": "#ebedf0",
        "FIRST_QUARTILE": "#47ffb9",
        "SECOND_QUARTILE": "#2fe3b9",
        "THIRD_QUARTILE": "#18c7b8",
        "FOURTH_QUARTILE": "#00abb8"
    },
    "dark": {
        "NONE": "#1e3138",
        "FIRST_QUARTILE": "#00abb8",
        "SECOND_QUARTILE": "#18c7b8",
        "THIRD_QUARTILE": "#2fe3b9",
        "FOURTH_QUARTILE": "#47ffb9"
    }
}

result = client.execute(query)
if result:
    calendar = result.get("user", {}).get("contributionsCollection", {}).get("contributionCalendar", {})
    weeks = calendar.get("weeks", [])
    if len(weeks) >= 7:
        last_weeks = weeks[-7:]
        for theme_name in themes:
            theme = themes[theme_name]
            with open(f"dev/github-contribution-chart.{theme_name}.svg", "w") as f:
                f.write("<?xml version='1.0' encoding='utf-8'?>")
                f.write("<svg xmlns='http://www.w3.org/2000/svg'>")
                for i, week in enumerate(last_weeks):
                    f.write(f"<g transform='translate({16 * i}, 0)'>")
                    for j, day in enumerate(week.get("contributionDays", [])):
                        f.write(f"<rect width='11' height='11' x='0' y='{15 * j}' fill='{theme.get(day.get('contributionLevel', 'NONE'))}'></rect>")
                    f.write("</g>")
                f.write("</svg>")
