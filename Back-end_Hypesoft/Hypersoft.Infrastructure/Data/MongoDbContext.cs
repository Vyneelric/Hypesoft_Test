using Hypersoft.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Hypersoft.Infrastructure.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    static MongoDbContext()
    {
        BsonClassMap.RegisterClassMap<Product>(cm =>
        {
            cm.AutoMap();
            cm.MapIdMember(c => c.id).SetSerializer(new StringSerializer(BsonType.String));
        });

        BsonClassMap.RegisterClassMap<Category>(cm =>
        {
            cm.AutoMap();
            cm.MapIdMember(c => c.id).SetSerializer(new StringSerializer(BsonType.String));
        });
    }

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Product> Products => _database.GetCollection<Product>("products");
    public IMongoCollection<Category> Categories => _database.GetCollection<Category>("categories");
}
