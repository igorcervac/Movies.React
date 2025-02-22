import React from "react";

const About = () => {
    return (<div className="about">
        <h2>About</h2>
        <div className="card">
            <p>
                    Movies is an application to select and save favourite movies. It consists of two parts: Movies.React and Movies.API.
                    <ol>
                        <li>
                            <a href="https://github.com/igorcervac/Movies.React">Movies.React</a> application, implemented using React and TypeScript and deployed as Azure Static Web App.
                        </li>
                        <li>
                            <a href="https://github.com/igorcervac/Movies.API">Movies.API</a> application, implemented using .NET 8, ASP.NET Core and SQL Server and deployed as Azure Web App.
                        </li> 
                    </ol>
            </p>
        </div>
    </div>);
}

export default About;