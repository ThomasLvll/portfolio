# coding: utf-8

import json, os

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport


with open(os.path.join(os.getcwd(), "res/data/.hidden/github-api-token"), "r") as f:
    _API_TOKEN = f.read()

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
        "BACKGROUND": "#fff",
        "NONE": "#ebedf0",
        "FIRST_QUARTILE": "#9effdb",
        "SECOND_QUARTILE": "#69c5be",
        "THIRD_QUARTILE": "#358ca2",
        "FOURTH_QUARTILE": "#005285"
    },
    "dark": {
        "BACKGROUND": "#000",
        "NONE": "#2d333b",
        "FIRST_QUARTILE": "#0E4429",
        "SECOND_QUARTILE": "#006d32",
        "THIRD_QUARTILE": "#26a641",
        "FOURTH_QUARTILE": "#39d353"
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
            path = os.path.join(os.getcwd(), f"res/img/github-contribution-chart.{theme_name}.svg")
            with open(path, "w") as f:
                f.write("<?xml version='1.0' encoding='utf-8'?>")
                f.write(f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='{theme.get('BACKGROUND')}'>")
                for i, week in enumerate(last_weeks):
                    x = 2 + (9 * i)
                    for j, day in enumerate(week.get("contributionDays", [])):
                        y = 2 + (9 * j)
                        f.write(f"<rect width='7' height='7' x='{x}' y='{y}' rx='1' fill='{theme.get(day.get('contributionLevel', 'NONE'))}'></rect>")
                f.write("</svg>")
